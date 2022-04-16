Shader "MyShader/BgGrid"
{
    Properties
    {
        _MainTex ("MainTex", 2D) = "white" {}
        _TintColor ("Color", Color) = (0.5,0.5,0.5,1)
        _Luminance ("Luminance", Range(0.1,10)) = 2
    }
    SubShader
    {
        Tags
        {
            "IgnoreProjector"="True"
            "Queue"="Transparent"
            "RenderType"="Transparent"
        }
        Pass
        {
            Name "FORWARD"
            Tags
            {
                "LightMode"="ForwardBase"
            }
            Blend One One
            ZWrite Off
            
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            //#define UNITY_PASS_FORWARDBASE
            #include "UnityCG.cginc"
            #pragma multi_compile_fwdbase
            #pragma exclude_renderers d3d11_9x xbox360 xboxone ps3 ps4 psp2 
            #pragma target 2.0
            uniform sampler2D _MainTex;
            uniform float4 _MainTex_ST;
            uniform float4 _TintColor;
            uniform float _Luminance;

            struct VertexInput
            {
                float4 vertex : POSITION;
            };
            struct VertexOutput
            {
                float4 pos : SV_POSITION;
                float4 posWorld : TEXCOORD0;
            };

            VertexOutput vert (VertexInput v)
            {
                VertexOutput o = (VertexOutput)0;
                // 模型空间 ==>世界空间
                o.posWorld = v.vertex;
                // 模型空间 ==>裁剪空间
                o.pos = UnityObjectToClipPos(v.vertex );
                return o;
            }

            float4 frag(VertexOutput i) : COLOR
            {
                // float2 texcoord = float2(i.posWorld.r,i.posWorld.b)*0.5;
                float2 texcoord = float2(i.posWorld.x,i.posWorld.y);
                // 用顶点的uv去和材质球的tiling和offset运算，确保材质球的缩放和偏移设置正确，_MainTex_ST.xy中是tiling，_MainTex_ST.zw中是offset
                // TRANSFORM_TEX(v.texcoord,_MainTex) ==> v.texcoord.xy * _MainTex_ST.xy + _MainTex_ST.zw
                float2 texuv = TRANSFORM_TEX(texcoord, _MainTex);
                // 在一张贴图中对一个点进行采样,输出像素颜色
                float4 texcolor = tex2D(_MainTex,texuv);
                float3 newcolor = texcolor.rgb * _TintColor.rgb;
                // float3 diffuse = newcolor;
                // float3 emissive = newcolor;
                float3 finalColor = newcolor * _Luminance;
                return fixed4(finalColor,1);
            }
            ENDCG
        }
    }
    FallBack "Diffuse"
}
