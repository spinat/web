package de.uni.services;

import de.uni.domain.Item;
import de.uni.domain.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PurchaseService {

    private static Logger LOG = LoggerFactory.getLogger(PurchaseService.class);

    @Autowired
    Storage storage;

    public Person addPerson(String personName) {
        List<Person> persons = Storage.getPurchase();

        Optional<Person> personOptional = persons.stream().filter(p -> p.getName().equals(personName)).findFirst();
        if(personOptional.isPresent()) {
            LOG.info("Person is already exist. Person={}", personOptional.get());
            return null;
        }

        Person person = new Person();
        person.setUuid(UUID.randomUUID().toString());
        person.setName(personName);

        persons.add(person);

        LOG.info("New Person. Person={}", person);
        return person;
    }

    public Item editItem(String personName, String itemUuid, String itemName, Double itemPrice) {
        LOG.info("edit item. Item={}");

        Person person = storage.getPerson(personName);

        Item foundItem = person.getItems().stream()
                .filter(currentItem -> currentItem.getUuid().equals(itemUuid))
                .findFirst()
                .get();

        foundItem.setName(itemName);
        foundItem.setPrice(itemPrice);

        return foundItem;
    }

    public List<Person> getPurchase() {
        return Storage.getPurchase();
    }

    public Item addItem(String personName) {

        Person person = storage.getPerson(personName);

        Item item = new Item();
        item.setUuid(UUID.randomUUID().toString());
        item.setPerson(person);

        person.getItems().add(item);
        return item;
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
