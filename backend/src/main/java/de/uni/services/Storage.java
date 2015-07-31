package de.uni.services;

import de.uni.domain.Item;
import de.uni.domain.Person;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Storage {

    private static final List<Person> purchase = Collections.synchronizedList(new ArrayList<Person>());

    public static List<Person> getPurchase() {
        return purchase;
    }

    public Person getPerson(String personName) {
        return purchase.stream()
                .filter(person -> person.getName().equals(personName))
                .findFirst()
                .get();
    }
}
