package de.uni.controllers;

import de.uni.domain.Item;
import de.uni.domain.Person;
import de.uni.services.FileService;
import de.uni.services.PurchaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PurchaseController {

    private static final Logger LOG = LoggerFactory.getLogger(PurchaseController.class);
    public static final String API_LIST_PURCHASE = "/api/listPurchase";

    @Autowired
    PurchaseService purchaseService;

    @Autowired
    FileService fileService;

    @MessageMapping("/addPerson")
    @SendTo("/topic/addPerson")
    public Person addPerson(String personName) throws Exception {
        LOG.info("Request to /addPerson. Person={}", personName);
        Person person = purchaseService.addPerson(personName);
        return person;
    }

    @MessageMapping("/deletePerson")
    @SendTo("/topic/deletePerson")
    public String deletePerson(String personName) throws Exception {
        LOG.info("Request to /deletePerson. Person={}", personName);
        purchaseService.deletePerson(personName);

        return personName;
    }

    @MessageMapping("/addItem")
    @SendTo("/topic/addItem")
    public Item addItem(String personName) {
        LOG.info("Request to /addItem");
        Item item = purchaseService.addItem(personName);

        return item;
    }

    @MessageMapping("/deleteItem/{uuid}")
    @SendTo("/topic/deleteItem")
    public String[] deleteItem(@DestinationVariable String uuid, String personName) {
        LOG.info("Request to /deleteItem/{itemId}");
        purchaseService.deleteItem(personName, uuid);
        return new String[]{personName, uuid};
    }

    @MessageMapping("/{personName}/editItem/{itemUuid}/{itemName}/{itemPrice}")
    @SendTo("/topic/editItem")
    public Item editItem(@DestinationVariable("personName") String personName,
                         @DestinationVariable("itemUuid") String itemUuid,
                         @DestinationVariable("itemName") String itemName,
                         @DestinationVariable("itemPrice") Double itemPrice) throws Exception {

        LOG.info("Request to /{personName}/editItem/{itemUuid}/{itemName}/{itemPrice}. PersonName={}, itemUuid={}, ItemName={}, ItemPrice={}", personName, itemUuid, itemName, itemPrice);

        itemPrice = itemPrice < 0 ? null : itemPrice;

        Item changeItem = purchaseService.editItem(personName, itemUuid, itemName, itemPrice);
        return changeItem;
    }

    @RequestMapping(API_LIST_PURCHASE)
    public Object[] listPurchase() {
        LOG.info("Request to {}.", API_LIST_PURCHASE);

        List<Person> purchase = purchaseService.getPurchase();
        List<List<Item>> items = purchase.stream()
                .map(person -> person.getItems())
                .collect(Collectors.toList());


        return new Object[]{purchase, items};
    }

    @RequestMapping("/api/save")
    public void save() throws IOException {
        LOG.info("Request to /api/save.");
        fileService.writeFile();
    }
}
