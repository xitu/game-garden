package com.example.petscoffee.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.petscoffee.databinding.ItemGoodsBinding
import com.example.petscoffee.bean.goods.Goods

/**
 * description ： 背包界面vp2的adapter
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class GoodsAdapter(private val bag: List<Goods>) : RecyclerView.Adapter<GoodsAdapter.ViewHolder>() {
    class ViewHolder(val binding: ItemGoodsBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = ItemGoodsBinding.inflate(LayoutInflater.from(parent.context))
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) { //该方法对Recycler子项的数据进行赋值，
        // 会在每个子项滚动到屏幕中时执行
        val good = bag[position] //根据position，获取bag中的goods实例
        holder.binding.goodsImage.setImageResource(good.imageId)
        holder.binding.goodsName.text = good.name
        holder.binding.goodsNumber.text = good.getNumber().toString()
    }

    override fun getItemCount(): Int {
        return bag.size
    }
}