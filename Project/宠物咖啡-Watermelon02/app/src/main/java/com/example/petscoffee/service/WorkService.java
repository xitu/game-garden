package com.example.petscoffee.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.example.petscoffee.R;
import com.example.petscoffee.ui.activities.WorkActivity;
import com.example.petscoffee.listener.WorkListener;
import com.example.petscoffee.task.WorkTask;

import java.util.ArrayList;


public class WorkService extends Service {
    private WorkListener workListener = new WorkListener() {//初始化WorkListener

        @RequiresApi(api = Build.VERSION_CODES.O)
        @Override
        public void onProgress(int progress) {
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.notify(1, createNotification(progress));
        }

        @RequiresApi(api = Build.VERSION_CODES.O)
        public void onSuccess(float money, ArrayList<String> process, ArrayList<String> bill) {
            stopForeground(true);//结束foreground
            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.notify(2, afterWorkNotification(money, process, bill));//发送营业结束Notification
            stopSelf();
        }
    };

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onCreate() {
        super.onCreate();
        super.onCreate();
        Notification notification = createNotification(0);
        WorkTask workTask = new WorkTask(this, workListener);
        workTask.execute();
        startForeground(1, notification);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public Notification createNotification(int progress) {
        //传入营业进度，生成相应的Notification对象
        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        NotificationChannel channel = new NotificationChannel("42", "petsCoffee", NotificationManager.IMPORTANCE_HIGH);
        manager.createNotificationChannel(channel);
        Notification notification = new Notification.Builder(this, channel.getId())
                .setContentTitle("营业中")
                .setSmallIcon(R.drawable.logo)
                .setProgress(100, progress, false)
                .setContentText(String.valueOf(progress) + "%")
                .setAutoCancel(true)
                .build();
        return notification;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public Notification afterWorkNotification(float money, ArrayList<String> process, ArrayList<String> bill) {
        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        //传入营业收入，宠物的工作过程和其产生的账单List
        //生成相应的结束工作Notification
        StringBuffer endData = new StringBuffer();
        for (int i = 0; i < process.size(); i++) {
            endData.append(process.get(i));
            endData.append(bill.get(i));//拼接工作结果字符串
        }
        NotificationChannel channel = new NotificationChannel("42", "petsCoffee", NotificationManager.IMPORTANCE_HIGH);
        manager.createNotificationChannel(channel);
        //设置点击
        Intent intent = new Intent(this, WorkActivity.class);
        intent.putExtra("endData", endData.toString());//向WorkActivity传递endData以显示结果
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification notification = new NotificationCompat.Builder(this, channel.getId())
                .setContentTitle("营业结束")
                .setSmallIcon(R.drawable.logo)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(endData))
                .setWhen(System.currentTimeMillis())
                .setContentIntent(pendingIntent)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.bell))
                .setAutoCancel(true)
                .build();
        return notification;
    }
}