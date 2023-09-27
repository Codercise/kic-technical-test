import React, { useState, useEffect, useRef } from "react";
import { Item, MyComponentProps } from "./MyComponent.types.ts"
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    color: '#fafafa',
    textAlign: 'center'
  }
})

export const MyComponent = (props: MyComponentProps) => {
  const data = props.data
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(data.filter((item: Item) => item.name.includes(searchTerm)));
    }, 1000);
  }, [searchTerm]);

  const handleSelect = (item: Item) => {
    setSelectedItems((currentSelectedItems) => {
      const newSelectedItems = [...currentSelectedItems]
      if (newSelectedItems.indexOf(item) > -1) {
        newSelectedItems.splice(newSelectedItems.indexOf(item), 1)
      } else {
        newSelectedItems.push(item)
      }
      
      return newSelectedItems
    })
  };

  const handleClear = () => {
    setSearchTerm("")
    inputRef?.current?.focus();
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        placeholder="Search..."
        value={searchTerm}
      />
      <TouchableOpacity
        onPress={handleClear}
        style={styles.button}
      >
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={(item: Item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
          >
            <Text>{item.name}</Text>
            <Text>
              {selectedItems.includes(item) ? "Selected" : "Not selected"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
