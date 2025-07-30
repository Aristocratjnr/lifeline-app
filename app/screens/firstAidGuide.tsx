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
  const [activeTab, setActiveTab] = useState<"emergency" | "exposures">("emergency")
  const [searchText, setSearchText] = useState("")
  const { t } = useTranslation();

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
  ];

  // Load fonts
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": require("@/assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Bold": require("@/assets/fonts/JetBrainsMono-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return <View style={styles.container} />
  }

  const renderCategory = (category: FirstAidCategory) => (
    <TouchableOpacity 
      key={category.id} 
      style={styles.categoryCard}
      onPress={() => {
        // Navigate to specific detail screen based on category id
        switch (category.id) {
          case "1": router.push('/screens/first-aid-details/cuts'); break;
          case "2": router.push('/screens/first-aid-details/stings'); break;
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
            <View style={styles.personIllustration}>
              <View style={styles.personHead} />
              <View style={styles.personBody} />
              <View style={styles.medicalCross}>
                <View style={styles.crossVertical} />
                <View style={styles.crossHorizontal} />
              </View>
            </View>
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
              activeTab === "emergency"
                ? styles.activeToggleButton
                : styles.inactiveToggleButton,
            ]}
            onPress={() => setActiveTab("emergency")}
          >
            <View>
              <Text style={[
                styles.toggleText,
                activeTab === "emergency" && styles.activeToggleText,
              ]}>
                {t('firstAid.emergencyTab')}
              </Text>
              {activeTab === "emergency" && <View style={styles.customUnderline} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === "exposures"
                ? styles.activeToggleButton
                : styles.inactiveToggleButton,
            ]}
            onPress={() => setActiveTab("exposures")}
          >
            <View>
              <Text style={[
                styles.toggleText,
                activeTab === "exposures" && styles.activeToggleText,
              ]}>
                {t('firstAid.exposuresTab')}
              </Text>
              {activeTab === "exposures" && <View style={styles.customUnderline} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesGrid}>{firstAidCategories.map(renderCategory)}</View>
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
  personIllustration: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  personHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFB5B5",
    marginBottom: 2,
  },
  personBody: {
    width: 30,
    height: 35,
    backgroundColor: "#FFB5B5",
    borderRadius: 15,
  },
  medicalCross: {
    position: "absolute",
    top: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  crossVertical: {
    width: 3,
    height: 12,
    backgroundColor: "#FF6B6B",
    position: "absolute",
  },
  crossHorizontal: {
    width: 12,
    height: 3,
    backgroundColor: "#FF6B6B",
    position: "absolute",
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
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#000",
    padding: 2,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
  activeToggleButton: {
    backgroundColor: "#fff",
  },
  inactiveToggleButton: {
    backgroundColor: "transparent",
  },
  toggleText: {
    fontSize: 13,
    color: "#888",
    fontFamily: "JetBrainsMono-Bold",
    fontWeight: "bold",
  },
  activeToggleText: {
    color: "#000",
  },
  customUnderline: {
    height: 2,
    backgroundColor: "#000",
    marginTop: 2,
    borderRadius: 1,
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
})

export default FirstAidGuides
