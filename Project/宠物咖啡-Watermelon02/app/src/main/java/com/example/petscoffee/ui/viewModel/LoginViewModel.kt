package com.example.petscoffee.ui.viewModel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.petscoffee.repository.LoginRepository
import com.example.petscoffee.repository.LoginResult
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * description ： LoginActivity对应的ViewModel,主要用于注册用户时的数据提交和登录验证
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/26 22:33
 */
class LoginViewModel : ViewModel() {
    val loginResult = MutableLiveData(LoginResult.CONNECTING)
    fun login(account: String, password: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val result = LoginRepository.login(account, password)
                loginResult.postValue(result)
            }catch (e:Exception){
                Log.d("testTag", "loginViewModel:${e}")
                loginResult.postValue(LoginResult.FALSE)
            }
        }
    }
}
