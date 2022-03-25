package com.example.petscoffee.ui.fragments

import android.app.AlertDialog
import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.ViewModelProvider
import com.example.petscoffee.databinding.DialogLoginRegisterBinding
import com.example.petscoffee.repository.RegisterResult
import com.example.petscoffee.ui.viewModel.RegisterViewModel

/**
 * description ： LoginActivity中点击注册用户按钮弹出的dialog，用于注册新用户
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:16
 */
class RegisterDialogFragment : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val viewModel = ViewModelProvider(this)[RegisterViewModel::class.java]
        val binding =
            DialogLoginRegisterBinding.inflate(
                LayoutInflater.from(requireContext()),
                null,
                false
            ) //加载注册界面
        binding.apply {
            //进行注册逻辑判断
            loginRegisterButton.setOnClickListener {
                val mAccount = loginRegisterAccountEditText.text.toString()
                val mName = loginRegisterNameEditText.text.toString()
                val mPassword = loginRegisterPasswordEditText.text.toString()
                val mConfirm = loginRegisterConfirmEditText.text.toString()
                if (mPassword == mConfirm) { //检测两次密码输入是否相同
                    viewModel.register(mAccount, mName, mPassword)
                } else { //两次密码不相同
                    loginRegisterPasswordLayout.error = "两次输入的密码不同，请重新输入"
                    loginRegisterConfirmLayout.error = "两次输入的密码不同，请重新输入"
                }
            }
            //根据注册结果关闭界面或是提示错误
            viewModel.registerResult.observe(this@RegisterDialogFragment) {
                when (it) {
                    RegisterResult.SUCCESS -> {//关闭dialog
                        Toast.makeText(requireContext(), "注册成功", Toast.LENGTH_LONG)
                            .show()
                        this@RegisterDialogFragment.dismiss()
                    }
                    RegisterResult.FALSE -> {
                        loginRegisterAccountLayout.error = "账号已存在，请换一个"
                    }
                }
            }
        }
        return AlertDialog.Builder(requireContext()).setView(binding.root).create()
    }
}