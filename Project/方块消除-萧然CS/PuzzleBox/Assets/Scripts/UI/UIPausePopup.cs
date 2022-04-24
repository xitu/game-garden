using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIPausePopup : UIPopupBase
{
    [SerializeField] private Button closeButton;
    [SerializeField] private Button restartButton;
    [SerializeField] private Button homeButton;

    private void Awake()
    {
        closeButton.onClick.AddListener(() =>
        {
            UIManager.Instance.HidePopup(this);
        });
        restartButton.onClick.AddListener(() =>
        {
            GameManager.Instance.RestartGame();
            UIManager.Instance.HidePopup(this);
        });
        homeButton.onClick.AddListener(() =>
        {
            UIManager.Instance.ShowPanel<UIMainPanel>();
            UIManager.Instance.HidePopup(this);
        });
    }

}
