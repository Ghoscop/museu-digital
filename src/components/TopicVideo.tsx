
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  videoId: string;
  title: string;
  channel: string;
  description: string;
}

export default function TopicVideo({
  videoId,
  title,
  channel,
  description,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.icon}>
          <Ionicons name="play" size={17} color="#D9B978" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>CINEIA • CONTEÚDO EM VÍDEO</Text>
          <Text style={styles.headingTitle}>Assista e aprenda</Text>
        </View>
      </View>

      <View style={styles.playerContainer}>
        <YoutubePlayer
          height={220}
          play={false}
          videoId={videoId}
          initialPlayerParams={{
            rel: false,
          }}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.channel}>{channel}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.footer}>
        <Ionicons
          name="information-circle-outline"
          size={15}
          color="#D9B978"
        />
        <Text style={styles.footerText}>
          Reprodução incorporada do YouTube
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101827',
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(217,185,120,0.20)',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 17,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#263449',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#D9B978',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  headingTitle: {
    color: '#F4F1E9',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
  },
  playerContainer: {
    backgroundColor: '#000',
    width: '100%',
  },
  info: {
    paddingHorizontal: 17,
    paddingTop: 15,
  },
  title: {
    color: '#F4F1E9',
    fontSize: 16,
    fontWeight: '800',
  },
  channel: {
    color: '#D9B978',
    fontSize: 11,
    marginTop: 6,
    fontWeight: '700',
  },
  description: {
    color: '#A7B1C0',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 9,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    padding: 15,
  },
  footerText: {
    color: '#98A6B8',
    fontSize: 9,
  },
});
