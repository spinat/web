package de.uni.controllers;

import de.uni.domain.Item;
import de.uni.domain.Person;
import de.uni.services.PurchaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PurchaseController {

    private static final Logger LOG = LoggerFactory.getLogger(PurchaseController.class);
    public static final String BUY = "/{personName}/buy";
    public static final String API_LIST_PURCHASE = "/api/listPurchase";

    @Autowired
    PurchaseService purchaseService;

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
    @SendTo("/topic/purchase")
    public List<Person> deleteItem(@DestinationVariable String uuid, String personName) {
        LOG.info("Request to /deleteItem/{itemId}");
        purchaseService.deleteItem(personName, uuid);
        return purchaseService.getPurchase();
    }

    @MessageMapping(BUY)
    @SendTo("/topic/purchase")
    public List<Person> editItem(@DestinationVariable("personName") String personName, @RequestBody Item item) throws Exception {

        LOG.info("Request to {}. Person={}, Item={}", BUY, personName, item);
        purchaseService.editItem(personName, item);
        return purchaseService.getPurchase();
    }

    @RequestMapping(API_LIST_PURCHASE)
    public List<Person> listPurchase() {
        LOG.info("Request to {}.", API_LIST_PURCHASE);
        return purchaseService.getPurchase();
    }
}
