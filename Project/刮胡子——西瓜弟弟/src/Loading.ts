class Loading{
    private static shared:Loading;
	public static getInstance(){
		if( !Loading.shared){
			Loading.shared = new Loading();
		}
		return Loading.shared;
	}
    private loading:Element
    private loading_text:Element
    constructor(){
        this.loading = document.querySelector('.loading')
        this.loading_text = this.loading.querySelector('.text')
    }
    public show(text?:string){
        if( text ){
            this.loading_text['innerText'] = text
        }else{
            this.loading_text['innerText'] = '加载中'
        }
        this.loading['style'].display = 'flex'
    }
    public hide(){
        this.loading['style'].display = 'none'
    }
}