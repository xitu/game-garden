package com.example.petscoffee.ui.fragments

import android.content.DialogInterface
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.example.petscoffee.R
import com.example.petscoffee.databinding.FragmentShopGoodsBinding
import com.example.petscoffee.databinding.ItemShopBinding
import com.example.petscoffee.bean.Bag
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.bean.equipments.Bell
import com.example.petscoffee.bean.equipments.Bowl
import com.example.petscoffee.bean.equipments.Equipment
import com.example.petscoffee.bean.equipments.Nest
import com.example.petscoffee.bean.goods.Foods
import com.example.petscoffee.bean.goods.Goods
import com.example.petscoffee.repository.ArchiveRepository
import java.util.*

/**
 * description ： 商店购买商品fragment,包含一个recyclerView，购买成功时会播放动画
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */

class ShopGoodsFragment : Fragment() {
    private val goods: MutableList<Goods> = ArrayList() //商品list,通过initGoods来设置内容
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val binding = FragmentShopGoodsBinding.inflate(inflater, container, false)
        initGoods()//初始化商店商品
        binding.shopRecycler.layoutManager =
            StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL)
        binding.shopRecycler.adapter = ShopAdapter(goods)
        return binding.root
    }

    inner class ShopAdapter(private val goods: List<Goods>) :
        RecyclerView.Adapter<ShopAdapter.ViewHolder>() {
        inner class ViewHolder(val binding: ItemShopBinding) :
            RecyclerView.ViewHolder(binding.root) {
            init {
                binding.shopItemLayout.setOnClickListener {
                    buyGoods(goods[absoluteAdapterPosition].name)
                }
            }
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val binding = ItemShopBinding.inflate(LayoutInflater.from(parent.context))
            return ViewHolder(binding)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val good = goods[position]
            holder.binding.shopItemImage.setImageResource(good.imageId)
            holder.binding.shopItemInfo.text = "${good.info}价格:${good.price}"
        }

        override fun getItemCount(): Int {
            return goods.size
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        goods.clear()
    }

    private fun initGoods() { //初始化商店商品
        goods.add(Foods())
        goods.add(Bell())
        goods.add(Bowl())
        goods.add(Nest())
        goods.add(Bowl())
        goods.add(Foods())
        goods.add(Bell())
        goods.add(Nest())
        goods.add(Bowl())
        goods.add(Nest())
        goods.add(Bowl())
        goods.add(Foods())
    }

    fun buyGoods(name: String) { //购买商品
        ArchiveRepository.loadCoffee { coffeeShop: CoffeeShop ->
            val view =
                LayoutInflater.from(activity).inflate(R.layout.shop_fragment_number_input, null)
            val builder = AlertDialog.Builder(
                requireActivity()
            )
            try {
                val good =
                    Class.forName(Goods::class.java.name.replace("Goods", name)).getConstructor()
                        .newInstance() as Goods
                //通过反射获取包名
                val price = good.price //获取物品价格
                builder.setTitle("购 买 $name")
                builder.setMessage("想要买多少个：")
                builder.setCancelable(false)
                builder.setView(view)
                builder.setPositiveButton("确认") { _: DialogInterface?, _: Int ->
                    val editText = view?.findViewById<EditText>(R.id.inputValue)
                    val num = editText?.text.toString().toInt()
                    if (coffeeShop.money >= num * price) { //如果钱够买这么多食物
                        try { //调用背包中的addGood方法
                            Bag.addGood(coffeeShop.bag, name, num)
                            playSuccess()
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                        coffeeShop.money = coffeeShop.money - num * price //扣钱
                        ArchiveRepository.saveCoffee(coffeeShop) //保存购买后的结果
                    } else {
                        Toast.makeText(activity, "钱钱不够", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                try { //当购买的为装备时，因为装备类不在goods包下，无法通过上面的反射得到，所以通过如下操作购买
                    val good = Class.forName(Equipment::class.java.name.replace("Equipment", name))
                        .getConstructor().newInstance() as Goods
                    //通过反射获取包名
                    val price = good.price //获取物品价格
                    builder.setTitle("购 买 $name")
                    builder.setMessage("想要买多少个：")
                    builder.setCancelable(false)
                    builder.setView(view)
                    builder.setPositiveButton("确认") { _: DialogInterface?, _: Int ->
                        val editText = view?.findViewById<EditText>(R.id.inputValue)
                        val num = editText?.text.toString().toInt()
                        if (coffeeShop.money >= num * price) { //如果钱够买这么多食物
                            try { //调用背包中的addGood方法
                                Bag.addGood(coffeeShop.bag, name, num)
                            } catch (w: Exception) {
                                e.printStackTrace()
                            }
                            coffeeShop.money = coffeeShop.money - num * price //扣钱
                            ArchiveRepository.saveCoffee(coffeeShop) //保存购买后的结果
                        } else {
                            Toast.makeText(activity, "钱钱不够", Toast.LENGTH_SHORT).show()
                        }
                    }
                } catch (w: Exception) {
                    w.printStackTrace()
                }
                e.printStackTrace()
            }
            builder.setNegativeButton("取消") { _: DialogInterface?, _: Int -> }
            requireActivity().runOnUiThread { builder.show() }
        }
    }

    private fun playSuccess() {//播放购买成功动画
        AlertDialog.Builder(requireActivity()).apply {
            setView(LayoutInflater.from(activity).inflate(R.layout.shopping_success, null))
            show()
        }
    }
}