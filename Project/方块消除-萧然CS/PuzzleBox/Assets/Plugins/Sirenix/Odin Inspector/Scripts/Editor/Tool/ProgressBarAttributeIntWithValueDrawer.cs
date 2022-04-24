using Sirenix.OdinInspector.Editor.Drawers;
using Sirenix.Utilities.Editor;
using UnityEngine;

public class ProgressBarAttributeIntWithValueDrawer : BaseProgressBarAttributeDrawer<int>
{
    protected override int DrawProgressBar(Rect rect, GUIContent label, double min, double max, ProgressBarConfig config, string valueLabel)
    {
        rect.width -= 60;
        int result = this.Attribute.Segmented
            ? (int) SirenixEditorFields.SegmentedProgressBarField(rect, label, this.ValueEntry.SmartValue, (long) min, (long) max,
                config, valueLabel)
            : (int) SirenixEditorFields.ProgressBarField(rect, label, this.ValueEntry.SmartValue, min, max, config,
                valueLabel);
        Rect valueRect = rect;
        Vector3 valueRectPos = rect.position;
        valueRectPos.x += rect.width - 10;
        valueRect.position = valueRectPos;
        valueRect.width = 70;
        result = SirenixEditorFields.IntField(valueRect, "", result);
        if (result > max) result = (int) max;
        if (result < min) result = (int) min;
        return result;
    }

    protected override double ConvertToDouble(int value)
    {
        return value;
    }
}
