// src/components/TrendingNews.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TrendingNews = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=ae8dc75744b344ba9dd45232ede98389')
      .then(response => setTrendingArticles(response.data.articles))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔥Trending News</Text>
      <FlatList
        horizontal
        data={trendingArticles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
            <View style={styles.articleItem}>
              {item.urlToImage && (
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
              )}
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleItem: {
    marginRight: 16,
    width: 200,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrendingNews;
