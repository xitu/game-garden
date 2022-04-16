using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIBattlePanel : UIPanelBase
{
    [SerializeField] private Button pauseButton;
    [SerializeField] private Text recordText;
    [SerializeField] private Text scoreText;

    private void Awake()
    {
        pauseButton.onClick.AddListener(()=> { UIManager.Instance.ShowPopup<UIPausePopup>(); });

        ScoreManager.OnScoreChangedAct += OnScoreChangedCallback;
    }

    private void Start()
    {
        scoreText.text = "";
        recordText.text = "";
    }

    private void OnDestroy()
    {
        ScoreManager.OnScoreChangedAct -= OnScoreChangedCallback;

    }

    public override float Show(params object[] args)
    {
        GameManager.Instance.StartupGame();

        return base.Show(args);
    }

    public override float Hide(bool isDestroy)
    {
        GameManager.Instance.ExitGame();

        return base.Hide(isDestroy);
    }

    private void OnScoreChangedCallback(int curScore,int maxScore)
    {
        scoreText.text = $"{curScore}";
        recordText.text = $"{maxScore}";
    }

}
