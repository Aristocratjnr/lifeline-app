"use client"

import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import type React from "react"
import { useState } from "react"
import { useTranslation } from 'react-i18next'
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

const { width } = Dimensions.get("window")

interface FirstAidCategory {
  id: string
  title: string
  imageSource: any
}

const FirstAidGuides: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"emergency" | "exposures" | "internal">("emergency")
  const [searchText, setSearchText] = useState("")
  const { t } = useTranslation();
  
  // Define category types for filtering
  const categoryTypes = {
    emergency: ["10","12", "16", "19", "21", "23", "25", "27"],
    exposures: ["1", "2", "3", "13", "4",  "7", "8", "14","11", "15", "17", "24", "26"],
    internal: ["5", "9", "6", "18", "20", "22"]
  };

  const firstAidCategories: FirstAidCategory[] = [
    { id: "1", title: t('firstAid.categories.cuts'), imageSource: require("../../assets/images/cut-palm.png") },
    { id: "2", title: t('firstAid.categories.stings'), imageSource: require("../../assets/images/beee.png") },
    { id: "3", title: t('firstAid.categories.splinter'), imageSource: require("../../assets/images/splinter.png") },
    { id: "4", title: t('firstAid.categories.sprainStrain'), imageSource: require("../../assets/images/pain.png") },
    { id: "5", title: t('firstAid.categories.fever'), imageSource: require("../../assets/images/flags/fever.png") },
    { id: "6", title: t('firstAid.categories.jockItch'), imageSource: require("../../assets/images/inch.png") },
    { id: "7", title: t('firstAid.categories.rash'), imageSource: require("../../assets/images/rash.png") },
    { id: "8", title: t('firstAid.categories.hives'), imageSource: require("../../assets/images/hives.png") },
    { id: "9", title: t('firstAid.categories.abdominalPains'), imageSource: require("../../assets/images/abdominal_pains.png") },
    { id: "10", title: t('firstAid.categories.choking'), imageSource: require("../../assets/images/choking.png") },
    { id: "11", title: t('firstAid.categories.frostBite'), imageSource: require("../../assets/images/frost_bite.png") },
    { id: "12", title: t('firstAid.categories.heatStroke'), imageSource: require("../../assets/images/heat_stroke.png") },
    { id: "13", title: t('firstAid.categories.noseBleed'), imageSource: require("../../assets/images/nose_bleed.png") },
    { id: "14", title: t('firstAid.categories.insectBite'), imageSource: require("../../assets/images/insect_bite.png") },
    { id: "15", title: t('firstAid.categories.sunBurn'), imageSource: require("../../assets/images/sun_burn.png") },
    { id: "16", title: t('firstAid.categories.fertile'), imageSource: require("../../assets/images/fertile.png") },
    { id: "17", title: t('firstAid.categories.bugs'), imageSource: require("../../assets/images/bugs.png") },
    { id: "18", title: t('firstAid.categories.cold'), imageSource: require("../../assets/images/cold.png") },
    { id: "19", title: t('firstAid.categories.cpr'), imageSource: require("../../assets/images/cpr.png") },
    { id: "20", title: t('firstAid.categories.chest'), imageSource: require("../../assets/images/chest.png") },
    { id: "21", title: t('firstAid.categories.faint'), imageSource: require("../../assets/images/faint.png") },
    { id: "22", title: t('firstAid.categories.head'), imageSource: require("../../assets/images/head.png") },
    { id: "23", title: t('firstAid.categories.heart'), imageSource: require("../../assets/images/heart.png") },
    { id: "24", title: t('firstAid.categories.rabbies'), imageSource: require("../../assets/images/rabbies.png") },
    { id: "25", title: t('firstAid.categories.shock'), imageSource: require("../../assets/images/shock.png") },
    { id: "26", title: t('firstAid.categories.skin-rash'), imageSource: require("../../assets/images/skin-rash.png") },
    { id: "27", title: t('firstAid.categories.head-injury'), imageSource: require("../../assets/images/head-injury.png") },

  ];

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return <View style={styles.container} />
  }

  // Filter categories based on search text and active tab
  const filteredCategories = firstAidCategories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesTab = categoryTypes[activeTab].includes(category.id);
    
    if (searchText.trim() === '') {
      return matchesTab;
    }
    return matchesSearch && matchesTab;
  });

  const renderCategory = (category: FirstAidCategory) => (
    <TouchableOpacity 
      key={category.id} 
      style={styles.categoryCard}
      onPress={() => {
        // Navigate to specific detail screen based on category id
        switch (category.id) {
          case "1": router.push('/screens/first-aid-details/cuts'); break;
          case "2": router.push('/screens/first-aid-details/Stings'); break;
          case "3": router.push('/screens/first-aid-details/splinter'); break;
          case "4": router.push('/screens/first-aid-details/sprain-strain'); break;
          case "5": router.push('/screens/first-aid-details/fever'); break;
          case "6": router.push('/screens/first-aid-details/jock-itch'); break;
          case "7": router.push('/screens/first-aid-details/rash'); break;
          case "8": router.push('/screens/first-aid-details/hives'); break;
          case "9": router.push('/screens/first-aid-details/abdominal-pains'); break;
          case "10": router.push('/screens/first-aid-details/choking'); break;
          case "11": router.push('/screens/first-aid-details/frost-bite'); break;
          case "12": router.push('/screens/first-aid-details/heat-stroke'); break;
          case "13": router.push('/screens/first-aid-details/nose-bleed'); break;
          case "14": router.push('/screens/first-aid-details/insect-bite'); break;
          case "15": router.push('/screens/first-aid-details/sun-burn'); break;
          case "16": router.push('/screens/first-aid-details/fertile'); break;
          case "17": router.push('./first-aid-details/bugs'); break;
          case "18": router.push('./first-aid-details/cold'); break;
          case "19": router.push('./first-aid-details/cpr'); break;
          case "20": router.push('./first-aid-details/chest'); break;
          case "21": router.push('./first-aid-details/faint'); break;
          case "22": router.push('./first-aid-details/head'); break;
          case "23": router.push('./first-aid-details/heart'); break;
          case "24": router.push('./first-aid-details/rabbies'); break;
          case "25": router.push('./first-aid-details/shock'); break;
          case "26": router.push('./first-aid-details/skin-rash'); break;
          case "27": router.push('./first-aid-details/head-injury'); break;
          default: router.push('/screens/firstAidGuide');
        }
      }}
    >
      <View style={styles.iconContainer}>
        <Image source={category.imageSource} style={styles.categoryImage} resizeMode="contain" />
      </View>
      <Text style={styles.categoryText}>{category.title}</Text>
    </TouchableOpacity>
  )

  return (
    <ImageBackground 
      source={require('../../assets/images/blur.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('firstAid.title')}</Text>
        </View>

        {/* Subtitle with illustration behind */}
        <View style={styles.subtitleContainer}>
          <View style={styles.illustrationBackground}>
            <Image 
              source={require('../../assets/images/firstbg.png')} 
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.subtitleTextContainer}>
            <Text style={styles.subtitle}>
              {t('firstAid.subtitle')}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('firstAid.searchPlaceholder')}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              styles.firstToggleButton,
              activeTab === "emergency" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("emergency")}
          >
            <Text style={[
              styles.toggleText,
              activeTab === "emergency" && styles.activeToggleText,
            ]}>
              Emergency
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "exposures" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("exposures")}
          >
            <Text style={[
              styles.toggleText,
              activeTab === "exposures" && styles.activeToggleText,
            ]}>
              External Exposures
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              styles.lastToggleButton,
              activeTab === "internal" && styles.activeToggleButton,
            ]}
            onPress={() => setActiveTab("internal")}
          >
            <Text style={[
              styles.toggleText,
              activeTab === "internal" && styles.activeToggleText,
            ]}>
              Internal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {filteredCategories.length > 0 ? (
            <View style={styles.categoriesGrid}>
              {filteredCategories.map(renderCategory)}
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={50} color="#999" />
              <Text style={styles.noResultsText}>No results found for &quot;{searchText}&quot;</Text>
              <Text style={styles.noResultsSubtext}>Try different keywords or check your spelling</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.89)',
    zIndex: 2,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 0,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 0.5,
    fontFamily: "JetBrainsMono-Bold",
  },
  subtitleContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
    minHeight: 70,
  },
  illustrationBackground: {
    position: "absolute",
    right: 0,
    top: -10,
    opacity: 0.7,
    zIndex: 0,
  },
  subtitleTextContainer: {
    zIndex: 1,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    fontFamily: "JetBrainsMono-Regular",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 6,
    borderRadius: 8,
  },
  illustrationImage: {
    width: 140,
    height: 140,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#000",
    fontFamily: "JetBrainsMono-Regular",
    paddingVertical: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    padding: 3,
    marginHorizontal: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  firstToggleButton: {
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  lastToggleButton: {
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
  },
  activeToggleButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "JetBrainsMono-Bold",
    fontWeight: "600",
    textAlign: "center",
  },
  activeToggleText: {
    color: "#000",
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  categoryCard: {
    width: (width - 56) / 3,
    aspectRatio: 0.9,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginBottom: 6,
    flex: 1,
    justifyContent: "center",
  },
  categoryImage: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    lineHeight: 12,
    letterSpacing: 0.2,
    fontFamily: "JetBrainsMono-Bold",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 13,
    fontFamily: 'JetBrainsMono-Regular',
    color: '#666',
    textAlign: 'center',
  },
})

export default FirstAidGuides
