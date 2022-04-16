using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScoreManager
{
    private static ScoreManager instance;
    public static ScoreManager Instance
    {
        get
        {
            if(instance == null)
            {
                instance = new ScoreManager();
                instance.Init();
            }
            return instance;
        }
    }

    private const string maxScoreKey = "MaxScoreKey";

    private const int addScorePerLine = 10;

    public static System.Action<int,int> OnScoreChangedAct;

    private void Init()
    {
        maxScore = PlayerPrefs.GetInt(maxScoreKey,0);
    }

    public int maxScore { get; private set; }
    public int curScore { get; private set; }
    public bool isNewRecord { get; private set; }

    public void SetMaxScore(int newScore)
    {
        if(newScore > maxScore)
        {
            if(!isNewRecord)
            {
                isNewRecord = true;
                AudioManager.Instance.PlaySoundOnce(AudioName.newRecordName);
            }

            maxScore = newScore;
            PlayerPrefs.SetInt(maxScoreKey,maxScore);

        }
    }

    public void OnGameStart()
    {
        curScore = 0;
        isNewRecord = false;

        OnScoreChangedAct?.Invoke(curScore,maxScore);
    }
    public void OnDissolveScore()
    {
        curScore += addScorePerLine;
        SetMaxScore(curScore);
        OnScoreChangedAct?.Invoke(curScore,maxScore);
    }
    public void OnGameEnd()
    {
        curScore = 0;
        isNewRecord = false;
    }

}
