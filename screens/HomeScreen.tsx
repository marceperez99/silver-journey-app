import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  View,
  Text,
  Colors,
  Carousel,
  TouchableOpacity,
  ActionSheet,
  Button,
} from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";
import { HomeNavProps } from "./types";
import LanguageDashboard from "../components/LanguageDashboard";
import useLanguages from "../hooks/useLanguages";
import NewLanguageView from "./NewLanguage";

const HomeScreen = ({ navigation }: HomeNavProps<"HomeScreen">) => {
  const { languages, create } = useLanguages();
  const carouselRef = useRef<any>(undefined);
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [actionSheetVisible, setActionSheetVisible] = useState<boolean>(false);
  useEffect(() => setLanguage(languages[0]?.name), [languages]);
  return (
    <View useSafeArea flex backgroundColor="white">
      {!!languages.length && (
        <View row br10 padding-16>
          <View flex />
          <TouchableOpacity
            flex-2
            centerV
            onPress={() => setActionSheetVisible(true)}
          >
            <Text marginB-16 center text60H color={Colors.textDark}>
              {language}
            </Text>
            {!!language && (
              <ActionSheet
                useNativeIOS
                visible={actionSheetVisible}
                title={"Select a Language"}
                onDismiss={() => setActionSheetVisible(false)}
                cancelButtonIndex={languages.length}
                options={[
                  ...languages.map(({ name }, i) => ({
                    label: name,
                    onPress: () => {
                      setLanguage(name);
                      carouselRef.current.goToPage(i);
                    },
                  })),
                  {
                    label: "Cancel",
                    onPress: () => setActionSheetVisible(false),
                  },
                ]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            flex
            right
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-sharp" size={24} color={Colors.grey40} />
          </TouchableOpacity>
        </View>
      )}
      <Carousel
        ref={(ref) => (carouselRef.current = ref)}
        animated
        onChangePage={(index) => {
          setLanguage(languages[index]?.name);
        }}
      >
        {Object.values(languages).map((lang) => {
          return (
            <LanguageDashboard
              key={lang.name}
              language={lang.name}
              navigation={navigation}
            />
          );
        })}
        <NewLanguageView createLanguage={create} />
      </Carousel>
    </View>
  );
};

export default HomeScreen;
