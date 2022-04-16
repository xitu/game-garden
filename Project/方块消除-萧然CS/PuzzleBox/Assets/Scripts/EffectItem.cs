using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EffectItem : MonoBehaviour
{
    public string effectName { get; private set; }
    public bool isPlaying => particle.isPlaying;

    private ParticleSystem particle;
    private ParticleSystem.MainModule mainModule;

    public bool isShow;

    private void Awake()
    {
        effectName = gameObject.name.Replace("(Clone)","");

        particle = GetComponentInChildren<ParticleSystem>();
        if(particle == null)
            Debug.LogError("particle == null");

        mainModule = particle.main;
    }

    private void Update()
    {
        isShow = isPlaying;
    }


    public void Show(bool? isLoop = null)
    {
        if(particle.isPlaying)
            particle.Stop();
        if(isLoop.HasValue)
        {
            if(mainModule.loop != isLoop.Value)
                mainModule.loop = isLoop.Value;
        }
        particle.Play();
    }

    public void Hide()
    {
        if(particle.isPlaying)
            particle.Stop();
    }

    public void SetColorOverLifetimeColor(Color gridColor)
    {
        var colModule = particle.colorOverLifetime;
        colModule.color = new ParticleSystem.MinMaxGradient(gridColor,gridColor * 0.5f);
        //colModule.color.gradient.colorKeys = new GradientColorKey[]
        //{
        //    new GradientColorKey(gridColor,0),
        //    new GradientColorKey(gridColor * 0.5f,1),
        //};
    }

}
