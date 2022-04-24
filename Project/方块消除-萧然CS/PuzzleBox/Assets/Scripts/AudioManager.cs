using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AudioName
{
    public const string gameStartName = "gameStart";
    public const string gameOverName = "gameOver";

    public const string pickUpName = "pickUp";
    public const string putDownName = "putDown";
    public const string putDown0Name = "putDown0";
    public const string putBackName = "putBack";
    public const string dissolveName = "dissolve";
    public const string dissolve0Name = "dissolve0";

    public const string newRecordName = "newRecord";

    public const string uiButtonName = "uiButton";
}

public class AudioManager : MonoBehaviour
{
    public static AudioManager Instance { get; private set; }

    //PlayerPrefs Key
    private const string audioBGMwitchKey = "audioBGMWitchPlayerPrefsKey";
    private const string audioSoundwitchKey = "audioSoundWitchPlayerPrefsKey";

    //BGM/音效 开关
    public bool bgmSwitch { get; private set; }
    public bool soundSwitch { get; private set; }

    private Dictionary<string,AudioClip> audioClipDic = new Dictionary<string,AudioClip>();

    private List<AudioSource> workSourceList = new List<AudioSource>();
    private Queue<AudioSource> idleSourceQueue = new Queue<AudioSource>();

    private AudioSource bgmSource;

    private float bgmVolume = 0.5f;
    private float soundVolume = 0.5f;

    private void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        bgmSwitch = PlayerPrefs.GetInt(audioBGMwitchKey,1) > 0;
        soundSwitch = PlayerPrefs.GetInt(audioSoundwitchKey,1) > 0;

        bgmSource = gameObject.AddComponent<AudioSource>();
        bgmSource.playOnAwake = false;
        bgmSource.loop = true;
        bgmSource.volume = bgmVolume;
    }

    // ----------

    //BGM开关
    public void SetBGMSwitch(bool newSwitch)
    {
        if(bgmSwitch != newSwitch)
        {
            bgmSwitch = newSwitch;
            PlayerPrefs.SetInt(audioBGMwitchKey,bgmSwitch ? 1 : 0);
        }
        if(bgmSwitch)
        {
            if(!bgmSource.isPlaying)
                bgmSource.Play();
        }
        else
        {
            if(bgmSource.isPlaying)
                bgmSource.Stop();
        }
    }
    //音效开关
    public void SetSoundSwitch(bool newSwitch)
    {
        if(soundSwitch != newSwitch)
        {
            soundSwitch = newSwitch;
            PlayerPrefs.SetInt(audioSoundwitchKey,soundSwitch ? 1 : 0);
        }
        if(!soundSwitch)
        {
            StopAllPlayingSound();
            DestroyEmptySource();
        }
    }

    #region --- BGM ---

    //播放/停止 BGM
    public void PlayBGM(string bgmName)
    {
        if(!bgmSwitch || string.IsNullOrEmpty(bgmName))
            return;

        AudioClip bgmClip = bgmSource.clip;

        if(bgmClip != null && bgmClip.name == bgmName)
        {
            if(!bgmSource.isPlaying)
                bgmSource.Play();

            return;
        }

        StartCoroutine(LoadBGM());

        IEnumerator LoadBGM()
        {
            var resourceRequest = Resources.LoadAsync<AudioClip>($"BGM/{bgmName}");
            yield return resourceRequest;
            PlayBGM(resourceRequest.asset as AudioClip);
        }
    }

    private void PlayBGM(AudioClip bgmClip)
    {
        if(!bgmSwitch || bgmClip == null)
            return;

        bgmSource.clip = bgmClip;
        bgmSource.Play();
    }
    public void StopBGM()
    {
        if(bgmSource.isPlaying)
            bgmSource.Stop();
    }

    public void PauseBGM()
    {
        if(bgmSource.isPlaying)
            bgmSource.Stop();
    }

    public void UnPauseBGM()
    {
        if(!bgmSource.isPlaying)
            bgmSource.Play();
    }

    #endregion

    #region --- Sound Once ---

    //播放音效(音效/名字)
    public void PlaySoundOnce(string clipName)
    {
        if(soundSwitch)
            StartCoroutine(PlaySoundOnce());

        //播放一段音效，并在播放完成后，回收播放器
        IEnumerator PlaySoundOnce()
        {
            yield return null;
            AudioClip audioClip = GetClipByName(clipName);
            if(audioClip == null)
                yield break;

            yield return null;
            AudioSource audioSource = GetEmptySource();
            if(audioSource == null)
                yield break;

            audioSource.loop = false;
            audioSource.clip = audioClip;
            audioSource.Play();

            yield return null;
            while(audioSource.isPlaying)
            {
                yield return null;
                yield return null;
                yield return null;
            }
            audioSource.clip = null;
            RevertSource(audioSource);
        }
    }

    //播放音效(音效/名字)
    public void PlaySoundDuration(string clipName,float duretion)
    {
        if(soundSwitch && duretion > 0)
            StartCoroutine(PlaySoundDuration());

        //播放一段音效，并在播放完成后，回收播放器
        IEnumerator PlaySoundDuration()
        {
            yield return null;
            AudioClip audioClip = GetClipByName(clipName);
            if(audioClip == null)
                yield break;

            yield return null;
            AudioSource audioSource = GetEmptySource();
            if(audioSource == null)
                yield break;

            audioSource.loop = true;
            audioSource.clip = audioClip;
            audioSource.Play();

            yield return new WaitForSeconds(duretion);

            audioSource.Stop();
            audioSource.loop = false;
            audioSource.clip = null;
            RevertSource(audioSource);
        }
    }

    #endregion

    #region --- Sound Loop ---

    //循环播放音效
    public AudioSource PlaySoundLoop(string clipName)
    {
        if(!soundSwitch)
            return null;

        AudioSource audioSource = GetEmptySource();
        if(audioSource == null)
            return null;

        AudioClip audioClip = GetClipByName(clipName);
        if(audioClip == null)
            return null;

        audioSource.loop = true;
        audioSource.clip = audioClip;
        audioSource.Play();

        return audioSource;
    }

    //停止播放音效(与PlaySoundLoop配合使用)
    public void StopSoundLoop(AudioSource audioSource)
    {
        if(audioSource != null)
        {
            audioSource.clip = null;
            RevertSource(audioSource);
        }
    }

    #endregion

    //停止所有播放音效
    public void StopAllPlayingSound()
    {
        StopAllCoroutines();
        for(int i = 0; i < workSourceList.Count; i++)
        {
            workSourceList[i].Stop();
            workSourceList[i].clip = null;

            idleSourceQueue.Enqueue(workSourceList[i]);
        }
        workSourceList.Clear();
    }

    //销毁多余空闲播放器
    private void DestroyEmptySource()
    {
        while(idleSourceQueue.Count > 0)
        {
            AudioSource audioSource = idleSourceQueue.Dequeue();
            Destroy(audioSource);
        }
    }

    // ----------

    #region --- Pool ---

    //获取一个空的播放器
    private AudioSource GetEmptySource()
    {
        AudioSource audioSource = null;
        //是否有空闲播放器
        if(idleSourceQueue.Count > 0)
        {
            audioSource = idleSourceQueue.Dequeue();
        }
        else
        {
            //若没有，生成
            audioSource = gameObject.AddComponent<AudioSource>();
            audioSource.playOnAwake = false;
            audioSource.volume = soundVolume;
        }
        workSourceList.Add(audioSource);
        return audioSource;
    }

    private void RevertSource(AudioSource audioSource)
    {
        if(audioSource != null)
        {
            if(workSourceList.Contains(audioSource))
                workSourceList.Remove(audioSource);
            if(!idleSourceQueue.Contains(audioSource))
                idleSourceQueue.Enqueue(audioSource);
        }
    }

    //通过名字获取音效片段
    private AudioClip GetClipByName(string clipName)
    {
        if(string.IsNullOrEmpty(clipName))
            return null;

        //获取过的音效，将存在字典中，下次直接通过字典获取
        if(audioClipDic.TryGetValue(clipName,out var audioClip))
        {
            return audioClip;
        }
        else
        {
            //Resources加载
            AudioClip newClip = Resources.Load<AudioClip>($"Sound/{clipName}");
            if(newClip == null)
            {
                Debug.LogError($"AudioClip == null : {clipName}");
                return null;
            }

            audioClipDic[clipName] = newClip;
            return newClip;
        }
    }

    #endregion

}
