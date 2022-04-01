package com.example.petscoffee.listener;

import java.util.ArrayList;

public interface WorkListener {
    void onProgress(int progress);
    void onSuccess(float money, ArrayList<String> process,ArrayList<String> bill);
}
