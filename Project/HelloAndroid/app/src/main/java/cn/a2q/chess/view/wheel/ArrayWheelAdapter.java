package cn.a2q.chess.view.wheel;



/**
 * The simple Array wheel adapter
 * @param <T> the element type
 */
public class ArrayWheelAdapter<T> implements WheelAdapter {
	
	/** The default items length */
	public static final int DEFAULT_LENGTH = -1;
	
	// items
	private T items[];
	// length
	private int length;

	/**
	 * Constructor
	 * @param items the items
	 * @param length the max items length
	 */
	public ArrayWheelAdapter(T items[], int length) {
		this.items = items;
		this.length = length;
	}
	
	/**
	 * Contructor
	 * @param items the items
	 */
	public ArrayWheelAdapter(T items[]) {
		this(items, DEFAULT_LENGTH);
	}

	public String getItem(int index) {
		if (index >= 0 && index < items.length) {
			return items[index].toString();
		}
		return null;
	}

	public int getItemsCount() {
		return items.length;
	}

	public int getMaximumLength() {
		for (int i = 0; i < items.length; i++) {
			int max_length = getItem(i).length();
			if (max_length > length) {
				length = max_length;
			}
		}
		return 2*length;
	}

}
