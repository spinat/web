package de.uni.services;

import de.uni.domain.Item;
import de.uni.domain.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PurchaseService {

    private static Logger LOG = LoggerFactory.getLogger(PurchaseService.class);

    @Autowired
    Storage storage;

    public boolean addPerson(Person personName) {
        List<Person> purchase = Storage.getPurchase();

        if(purchase.contains(personName)) {
            LOG.warn("Person already exist. Person={}", personName);
            return false;
        }

        purchase.add(personName);
        LOG.info("Person is entered. Person={}", personName);
        return true;
    }

    public void editItem(String personName, Item item) {
        LOG.info("edit item. Item={}");

        Person person = storage.getPerson(personName);

        Item foundItem = person.getItems().stream()
                .filter(currentItem -> currentItem.getUuid().equals(item.getUuid()))
                .findFirst()
                .get();

        foundItem.setName(item.getName());
        foundItem.setPrice(item.getPrice());
    }

    public List<Person> getPurchase() {
        return Storage.getPurchase();
    }

    public void addItem(String personName) {
        Person person = storage.getPerson(personName);
        Item item = new Item();
        item.setUuid(UUID.randomUUID().toString());
        person.getItems().add(item);
    }

    public void deleteItem(String personName, String uuid) {
        Person person = storage.getPerson(personName);
        List<Item> items = person.getItems();
        items.removeIf(item -> item.getUuid().equals(uuid));
    }

    public void deletePerson(String personName) {
        storage.getPerson(personName).getItems().clear();
        List<Person> persons = getPurchase();
        persons.removeIf(person -> person.getName().equals(personName));
    }
}
