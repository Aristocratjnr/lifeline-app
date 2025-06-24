import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Linking, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NEWS_API_KEY = process.env.EXPO_PUBLIC_MEDIASTACK_KEY; 
const NEWS_API_LIMIT = 100; // Increased limit
const NEWS_API_URL = `https://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&categories=health&languages=en&limit=${NEWS_API_LIMIT}`;
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// News API article type for mediastack
// See: https://mediastack.com/documentation
// Example fields: author, title, description, url, source, image, category, language, country, published_at

type NewsArticle = {
  author?: string;
  title: string;
  description?: string;
  url?: string;
  source?: string;
  image?: string;
  category?: string;
  language?: string;
  country?: string;
  published_at?: string;
};

export default function FirstAidNewsScreen() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = useCallback(async (pageNum = 1, append = false) => {
    setError('');
    if (pageNum === 1) setIsLoading(true);
    if (pageNum > 1) setLoadingMore(true);
    try {
      const response = await fetch(`${NEWS_API_URL}&offset=${(pageNum - 1) * NEWS_API_LIMIT}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error.message || 'Failed to fetch news');
      const articles = data.data || [];
      setHasMore(articles.length === NEWS_API_LIMIT);
      setNews(prev => append ? [...prev, ...articles] : articles);
      setPage(pageNum);
    } catch (err: any) {
      setError(err.message || 'Unable to load news at this time.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(1);
    const interval = setInterval(() => fetchNews(1), AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNews]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchNews(1);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(page + 1, true);
    }
  };

  // Fade-in image component with loading indicator and improved clarity
  const FadeInImage = ({ uri }: { uri: string }) => {
    const opacity = React.useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(true);
    return (
      <View style={styles.imageContainer}>
        {loading && (
          <View style={styles.imageLoader}><ActivityIndicator size="small" color="#FC7A7A" /></View>
        )}
        <Animated.Image
          source={{ uri }}
          style={{ width: '100%', height: 180, borderRadius: 14, opacity, backgroundColor: '#fff' }}
          resizeMode="contain"
          onLoad={() => {
            setLoading(false);
            Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
          }}
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: NewsArticle }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={() => item.url && Linking.openURL(item.url)}
    >
      {item.image ? (
        <FadeInImage uri={item.image} />
      ) : (
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <MaterialIcons name="image-not-supported" size={48} color="#FC7A7A" />
          </View>
        </View>
      )}
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      {item.description ? <Text style={styles.cardDesc} numberOfLines={3}>{item.description}</Text> : null}
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <MaterialIcons name="source" size={18} color="#aaa" style={{ marginRight: 2 }} />
          <Text style={styles.cardSource} numberOfLines={1}>{item.source || 'Unknown Source'}</Text>
        </View>
        <View style={styles.footerRight}>
          <MaterialIcons name="schedule" size={16} color="#aaa" style={{ marginRight: 2 }} />
          <Text style={styles.cardDate}>{item.published_at ? new Date(item.published_at).toLocaleString() : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="local-hospital" size={40} color="#FC7A7A" />
        </View>
        <Text style={styles.title}>First Aid News & Alerts</Text>
        <Text style={styles.subtitle}>
          Stay updated with the latest news and alerts on first aid and health emergencies.
        </Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh} disabled={isRefreshing || isLoading}>
          <MaterialIcons name="refresh" size={22} color="#FC7A7A" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FC7A7A" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item: NewsArticle, idx) => item.url || idx.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#FC7A7A" />}
          ListEmptyComponent={<Text style={styles.emptyText}>No news found.</Text>}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#FC7A7A" style={{ marginVertical: 16 }} /> : null}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#FC7A7A',
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  refreshText: {
    color: '#FC7A7A',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 15,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFF5F5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1.2,
    borderColor: '#FDE4E4',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f8f9fa', // subtle background
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE4E4',
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageLoader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  placeholderImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FC7A7A',
    marginBottom: 6,
    textAlign: 'left',
  },
  cardDesc: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 10,
    textAlign: 'left',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  cardSource: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    flexShrink: 1,
    maxWidth: 120,
  },
  cardDate: {
    fontSize: 13,
    color: '#888',
    marginLeft: 2,
  },
  errorText: {
    marginTop: 40,
    color: '#FC7A7A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 40,
    color: '#374151',
    fontSize: 16,
    textAlign: 'center',
  },
}); 
