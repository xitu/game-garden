using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UIResultPopup : UIPopupBase
{
    [SerializeField] private Button restartButton;
    [SerializeField] private Button homeButton;

    private void Awake()
    {
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
