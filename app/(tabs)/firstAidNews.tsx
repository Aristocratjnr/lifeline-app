import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Linking,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NEWS_API_KEY = process.env.EXPO_PUBLIC_MEDIASTACK_KEY; 
const NEWS_API_LIMIT = 100;
const NEWS_API_URL = `https://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&categories=health&languages=en&limit=${NEWS_API_LIMIT}`;
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const headerAnimation = React.useRef(new Animated.Value(0)).current;

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
    
    // Animate header on mount
    Animated.spring(headerAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
    
    return () => clearInterval(interval);
  }, [fetchNews, headerAnimation]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchNews(1);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(page + 1, true);
    }
  };

  const FadeInImage = ({ uri }: { uri: string }) => {
    const opacity = React.useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(true);
    const [error, setImageError] = useState(false);
    
    return (
      <View style={styles.imageContainer}>
        {loading && !error && (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="small" color="#FC7A7A" />
          </View>
        )}
        {!error ? (
          <Animated.Image
            source={{ uri }}
            style={[styles.newsImage, { opacity }]}
            resizeMode="cover"
            onLoad={() => {
              setLoading(false);
              Animated.timing(opacity, { 
                toValue: 1, 
                duration: 500, 
                useNativeDriver: true 
              }).start();
            }}
            onError={() => {
              setLoading(false);
              setImageError(true);
            }}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="broken-image" size={40} color="#FC7A7A" />
            <Text style={styles.placeholderText}>Image unavailable</Text>
          </View>
        )}
      </View>
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffMs = now.getTime() - publishedDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const NewsCard = ({ item, index }: { item: NewsArticle; index: number }) => {
    const cardAnimation = React.useRef(new Animated.Value(0)).current;
  
    React.useEffect(() => {
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, [cardAnimation, index]);
  
    const animatedStyle = {
      opacity: cardAnimation,
      transform: [{
        translateY: cardAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      }],
    };
  
    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.92}
          onPress={() => item.url && Linking.openURL(item.url)}
        >
          <LinearGradient
            colors={['#fff', '#FEFEFE']}
            style={styles.cardGradient}
          >
            {item.image ? (
              <FadeInImage uri={item.image} />
            ) : (
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <MaterialIcons name="article" size={48} color="#FC7A7A" />
                  <Text style={styles.placeholderText}>Health News</Text>
                </View>
              </View>
            )}
            
            <View style={styles.cardContent}>
              <View style={styles.categoryBadge}>
                <MaterialIcons name="local-hospital" size={14} color="#10B981" />
                <Text style={styles.categoryText}>Health</Text>
              </View>
              
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              
              {item.description && (
                <Text style={styles.cardDesc} numberOfLines={3}>
                  {item.description}
                </Text>
              )}
              
              <View style={styles.cardFooter}>
                <View style={styles.sourceContainer}>
                  <View style={styles.sourceIcon}>
                    <MaterialIcons name="public" size={14} color="#6B7280" />
                  </View>
                  <Text style={styles.cardSource} numberOfLines={1}>
                    {item.source || 'Unknown Source'}
                  </Text>
                </View>
                
                <View style={styles.timeContainer}>
                  <MaterialIcons name="access-time" size={14} color="#6B7280" />
                  <Text style={styles.cardDate}>
                    {item.published_at ? formatTimeAgo(item.published_at) : ''}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  const renderItem = ({ item, index }: { item: NewsArticle; index: number }) => (
    <NewsCard item={item} index={index} />
  );

  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FC7A7A" />
      <Text style={styles.loadingText}>Loading health news...</Text>
    </View>
  );

  const ErrorComponent = () => (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={48} color="#FC7A7A" />
      <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => fetchNews(1)}>
        <MaterialIcons name="refresh" size={20} color="#fff" />
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  const headerAnimatedStyle = {
    opacity: headerAnimation,
    transform: [{
      translateY: headerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 0],
      }),
    }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F5" />
      
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View style={styles.headerTop}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#FFFFF', '#FFFFF']}
                style={styles.iconGradient}
              >
                <Animated.Image
                  source={require('@/assets/images/woman.png')}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  resizeMode="cover"
                />
              </LinearGradient>
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Health News & Alerts</Text>
              <Text style={styles.subtitle}>
                Stay informed with the latest health emergencies and first aid updates
              </Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{news.length}</Text>
              <Text style={styles.statLabel}>Articles</Text>
            </View>
            <View style={styles.statDivider} />
            <TouchableOpacity 
              style={styles.refreshContainer} 
              onPress={onRefresh} 
              disabled={isRefreshing || isLoading}
            >
              <MaterialIcons 
                name="refresh" 
                size={20} 
                color="#FC7A7A" 
                style={[
                  styles.refreshIcon,
                  (isRefreshing || isLoading) && styles.refreshingIcon
                ]} 
              />
              <Text style={styles.refreshText}>
                {isRefreshing ? 'Updating...' : 'Refresh'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {isLoading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorComponent />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, idx) => item.url || idx.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl 
                refreshing={isRefreshing} 
                onRefresh={onRefresh} 
                tintColor="#FC7A7A"
                colors={['#FC7A7A']}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="inbox" size={64} color="#D1D5DB" />
                <Text style={styles.emptyTitle}>No news available</Text>
                <Text style={styles.emptyText}>Check back later for updates</Text>
              </View>
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loadMoreContainer}>
                  <ActivityIndicator size="small" color="#FC7A7A" />
                  <Text style={styles.loadMoreText}>Loading more...</Text>
                </View>
              ) : null
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FC7A7A',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  refreshIcon: {
    marginRight: 6,
  },
  refreshingIcon: {
    opacity: 0.5,
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FC7A7A',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 20,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardGradient: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F9FAFB',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    zIndex: 1,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#FC7A7A',
    fontWeight: '500',
    marginTop: 8,
  },
  cardContent: {
    padding: 20,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cardSource: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FC7A7A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#FC7A7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  loadMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
});
