package com.example.petscoffee.ui.activities

import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.petscoffee.R
import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.databinding.ActivityLoginBinding
import com.example.petscoffee.repository.LoginResult
import com.example.petscoffee.repository.local.CoffeeDatabase.Companion.createInstance
import com.example.petscoffee.ui.fragments.RegisterDialogFragment
import com.example.petscoffee.ui.viewModel.LoginViewModel
import com.google.gson.Gson

/**
 * description ： 登录activity，包含登录（可通过sp记住密码），注册功能。
 * 在该模块创建了roomDatabase的实例
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/22 22:53
 */
class LoginActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var account: String
    private lateinit var password: String
    private var isSaved = false
    private lateinit var viewModel: LoginViewModel
    private lateinit var sp: SharedPreferences
    private lateinit var editor: SharedPreferences.Editor

    override fun onCreate(savedInstanceState: Bundle?) {
        //绑定控件
        super.onCreate(savedInstanceState)
        viewModel = ViewModelProvider(this)[LoginViewModel::class.java]
        binding =
            DataBindingUtil.setContentView(this, R.layout.activity_login) as ActivityLoginBinding
        binding.loginCheckBox.isChecked//默认记住密码
        createInstance(this.applicationContext) //因为该activity为app的最初activity,创建数据库实例
        viewModel.loginResult.observe(this) {
            when (it) {
                LoginResult.SUCCESS -> loginSuccess()
                LoginResult.FALSE -> loginFalse()
            }
            binding.loginButton.setOnClickListener(this)
            binding.loginRegister.setOnClickListener(this)
            binding.loginForget.setOnClickListener(this)
            //登陆逻辑部分
            getRemember()
        }
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.login_button -> login()
            R.id.login_forget -> Toast.makeText(this, "尚未开放该功能", Toast.LENGTH_SHORT).show()
            R.id.login_register -> RegisterDialogFragment().show(
                supportFragmentManager,
                "registerDialogFragment"
            )//弹出注册dialog
        }
    }

    private fun getRemember() {//是否已经有本地保存了的密码,如果有则在editText中输入数据
        sp = getSharedPreferences("test", MODE_PRIVATE)
        editor = sp.edit() //用于本地存储已经登陆过的用户账号密码
        isSaved = sp.getBoolean("isSaved", false)
        val info = sp.getString("data", null)
        if (isSaved) {
            binding.loginCheckBox.isChecked = true
            account = Gson().fromJson(info, CoffeeShop::class.java).name
            password = Gson().fromJson(info, CoffeeShop::class.java).password
            binding.loginAccountEditText.setText(account)
            binding.loginPasswordEditText.setText(password)
        }
    }

    private fun login() { //进行登陆判断
        account = binding.loginAccountEditText.text.toString()
        password = binding.loginPasswordEditText.text.toString()
        if (account.isEmpty()) {
            runOnUiThread { binding.loginAccountLayout.error = "请输入账号" }
            return
        }
        if (password.isEmpty()) {
            runOnUiThread { binding.loginPasswordLayout.error = "请输入密码" }
            return
        }
        viewModel.login(account, password)
    }

    private fun loginSuccess() {
        if (binding.loginCheckBox.isChecked) { //是否勾选记住密码
            //勾选则存储账号密码到本地
            val data = Gson().toJson(CoffeeShop(account, account, password))
            editor.putString("data", data)
            editor.putBoolean("isSaved", true)
            editor.apply()
        } else {
            isSaved = false
            editor.putBoolean("isSaved", false)
            editor.apply()
        }
        startActivity(Intent(this, FirstActivity::class.java))
        finish() //结束该activity
    }

    private fun loginFalse() {
        binding.loginAccountLayout.error = "账号或密码错误"
        binding.loginPasswordLayout.error = "账号或密码错误"
    }
}