package com.example.petscoffee.ui.viewModel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.petscoffee.repository.RegisterRepository
import com.example.petscoffee.repository.RegisterResult
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * description ： RegisterDialogFragment对应的viewModel,主要用于后端注册用户
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:49
 */
class RegisterViewModel : ViewModel() {
    val registerResult = MutableLiveData(RegisterResult.CONNECTING)
    fun register(account: String, name: String, password: String) {
        CoroutineScope(Dispatchers.IO).launch{
            val result = RegisterRepository.register(account, name, password)
            registerResult.postValue(result)
        }
    }
}