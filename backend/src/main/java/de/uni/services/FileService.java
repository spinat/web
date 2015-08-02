package de.uni.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.uni.domain.Item;
import de.uni.domain.Person;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class FileService {

    private static final String personFile = "persons.json";
    private static final String itemFile = "items.json";

    public void writeFile() throws IOException {
        List<Person> persons = Storage.getPurchase();
        List<List<Item>> items = Storage.getPurchase().stream()
                .map(person -> person.getItems())
                .collect(Collectors.toList());

        ObjectMapper mapper = new ObjectMapper();

        mapper.writeValue(new File(personFile), persons);
        mapper.writeValue(new File(itemFile), items);
    }

    public void loadData() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Person> persons = mapper.readValue(new File(personFile), new TypeReference<List<Person>>(){});
        List<List<Item>> items = mapper.readValue(new File(itemFile), new TypeReference<List<List<Item>>>() {});

        List<Person> purchase = Storage.getPurchase();
        purchase.addAll(persons);

        IntStream.range(0, items.size())
                .forEach(i -> {
                    Person person = purchase.get(i);
                    List<Item> currentItems = items.get(i);
                    person.setItems(currentItems);
                });
    }

}
