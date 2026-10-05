import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  MEDIA_ICONS,
  MEDIA_LABELS,
} from "../../constants/mediaTypes";

import {
  MediaType,
  Section,
} from "../../types/media";

import ImportButton from "../common/ImportButton";

type SidebarProps = {
  active: Section;
  onSelect: (section: Section) => void;
  onImport: (type: MediaType) => void;
};

export default function Sidebar({
  active,
  onSelect,
  onImport,
}: SidebarProps) {
  const renderItem = (
    label: string,
    icon: string,
    section: Section
  ) => {
    const isActive = active === section;

    return (
      <TouchableOpacity
        key={section} // ✨ Perbaikan di sini untuk mengatasi error di baris 84
        activeOpacity={0.7}
        onPress={() => onSelect(section)}
        style={[
          styles.item,
          isActive ? styles.activeItem : null,
        ]}
      >
        <Text style={styles.icon}>
          {icon}
        </Text>

        <Text style={styles.label}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>
        MEDIA LIBRARY
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* BERANDA */}
        {renderItem(
          "Beranda",
          "⌂",
          "home"
        )}

        {/* COLLECTION */}
        <Text style={styles.heading}>
          COLLECTION
        </Text>

        {(
          ["audio", "video", "image"] as MediaType[]
        ).map((type) =>
          renderItem(
            MEDIA_LABELS[type],
            MEDIA_ICONS[type],
            type
          )
        )}

        {/* IMPORT */}
        <Text style={styles.heading}>
          IMPORT
        </Text>

        {(
          ["audio", "video", "image"] as MediaType[]
        ).map((type) => (
          <ImportButton
            key={type}
            label={`+ Tambah ${MEDIA_LABELS[type]}`}
            onPress={() => onImport(type)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 235,
    backgroundColor: "#111111",
    padding: 18,
    borderRightWidth: 1,
    borderRightColor: "#252525",
  },

  logo: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 22,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 3,
  },

  activeItem: {
    backgroundColor: "#272727",
  },

  icon: {
    width: 30,
    color: "#ffffff",
    fontSize: 19,
  },

  label: {
    color: "#ffffff",
    fontSize: 14,
  },

  heading: {
    color: "#777777",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 9,
    letterSpacing: 1,
  },
});
