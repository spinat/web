package de.uni;

import de.uni.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class StartupHousekeeper implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    FileService fileService;

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        try {
            fileService.loadData();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}