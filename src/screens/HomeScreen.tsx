
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const COLORS = {
  background: '#080D18',
  surface: '#101827',
  surfaceLight: '#162236',
  gold: '#D9B978',
  goldLight: '#F0DCA7',
  white: '#F5F3EE',
  muted: '#9BA8B9',
  blue: '#4A91D9',
  border: 'rgba(217,185,120,0.18)',
};

const exhibitions = [
  {
    id: 'machine-learning',
    number: '01',
    category: 'FUNDAMENTOS',
    title: 'Aprendizagem de Máquina',
    subtitle: 'Quando os dados ensinam as máquinas.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900',
    icon: 'git-network-outline',
    color: '#6A9ED8',
  },
  {
    id: 'generative-ai',
    number: '02',
    category: 'NOVA ERA',
    title: 'IA Generativa',
    subtitle: 'A inteligência que cria novas possibilidades.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900',
    icon: 'sparkles-outline',
    color: '#C7A7F5',
  },
  {
    id: 'cloud',
    number: '03',
    category: 'INFRAESTRUTURA',
    title: 'Nuvem e Inteligência Artificial',
    subtitle: 'O poder computacional por trás da revolução.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900',
    icon: 'cloud-outline',
    color: '#72B8D8',
  },
  {
    id: 'mobile',
    number: '04',
    category: 'IA NO COTIDIANO',
    title: 'Dispositivos Móveis Inteligentes',
    subtitle: 'A inteligência artificial na palma da mão.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900',
    icon: 'phone-portrait-outline',
    color: '#7FC7B2',
  },
  {
    id: 'cybersecurity',
    number: '05',
    category: 'PROTEÇÃO DIGITAL',
    title: 'Segurança da Informação e IA',
    subtitle: 'Como a inteligência artificial protege o mundo digital.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900',
    icon: 'shield-checkmark-outline',
    color: '#E1B978',
  },
];

const timeline = [
  {
    year: '2010',
    title: 'A expansão dos dados',
    description:
      'O crescimento dos dispositivos conectados amplia a quantidade de dados disponíveis para sistemas inteligentes.',
  },
  {
    year: '2012',
    title: 'O avanço do Deep Learning',
    description:
      'Redes neurais profundas conquistam resultados importantes no reconhecimento de imagens.',
  },
  {
    year: '2016',
    title: 'Máquinas vencem novos desafios',
    description:
      'Sistemas de IA demonstram capacidades avançadas em jogos, estratégias e reconhecimento de padrões.',
  },
  {
    year: '2022',
    title: 'A popularização da IA generativa',
    description:
      'Ferramentas conversacionais aproximam a inteligência artificial do cotidiano de milhões de pessoas.',
  },
  {
    year: '2026',
    title: 'A inteligência artificial no cotidiano',
    description:
      'Sistemas inteligentes avançam em diferentes áreas, com novas possibilidades e desafios éticos.',
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? (
        <Text style={styles.sectionDescription}>{description}</Text>
      ) : null}
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable
          onPress={() => navigation.navigate("History")}
          style={{
            marginHorizontal: 22,
            marginBottom: 16,
            padding: 14,
            borderRadius: 12,
            backgroundColor: "#162236",
            borderWidth: 1,
            borderColor: "rgba(217,185,120,0.25)",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
          }}
        >
          <Ionicons name="analytics-outline" size={19} color="#D9B978" />
          <Text style={{ color: "#D9B978", fontWeight: "700" }}>
            HISTÓRICO DE INTERAÇÕES
          </Text>
        </Pressable>

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <Ionicons name="planet-outline" size={22} color={COLORS.gold} />
            </View>

            <View>
              <Text style={styles.brandName}>MUSEU DIGITAL</Text>
              <Text style={styles.brandSubtitle}>EXPERIÊNCIA TECNOLÓGICA</Text>
            </View>
          </View>

          <View style={styles.headerBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.headerBadgeText}>ERA DA IA</Text>
          </View>
        </View>

        {/* CAPA PRINCIPAL */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400',
          }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={[
              'rgba(8,13,24,0.10)',
              'rgba(8,13,24,0.62)',
              'rgba(8,13,24,0.98)',
            ]}
            locations={[0, 0.48, 1]}
            style={styles.heroOverlay}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroLabel}>
                <View style={styles.heroLabelLine} />
                <Text style={styles.heroLabelText}>
                  UMA NOVA ERA COMEÇA
                </Text>
              </View>

              <Text style={styles.heroTitle}>
                A REVOLUÇÃO DA
              </Text>
              <Text style={styles.heroTitleGold}>
                INTELIGÊNCIA
              </Text>
              <Text style={styles.heroTitleGold}>
                ARTIFICIAL
              </Text>

              <Text style={styles.heroDescription}>
                Uma jornada pela tecnologia que está transformando
                a maneira como vivemos, pensamos e construímos o futuro.
              </Text>

              <View style={styles.heroMeta}>
                <Ionicons name="time-outline" size={15} color={COLORS.gold} />
                <Text style={styles.heroMetaText}>2010 — PRESENTE</Text>
                <View style={styles.metaDivider} />
                <Ionicons name="layers-outline" size={15} color={COLORS.gold} />
                <Text style={styles.heroMetaText}>05 EXPOSIÇÕES</Text>
              </View>

              <Pressable
                style={styles.primaryButton}
                onPress={() =>
                  navigation.navigate('Exhibition', {
                    topicId: 'generative-ai',
                  })
                }
              >
                <Text style={styles.primaryButtonText}>EXPLORAR O MUSEU</Text>
                <Ionicons name="arrow-forward" size={18} color="#080D18" />
              </Pressable>
            </View>
          </LinearGradient>

          <View style={styles.heroCorner}>
            <Text style={styles.heroCornerNumber}>01</Text>
            <Text style={styles.heroCornerText}>EXPOSIÇÃO DIGITAL</Text>
          </View>
        </ImageBackground>

        {/* INTRODUÇÃO */}
        <View style={styles.introSection}>
          <View style={styles.introLine} />
          <Text style={styles.introText}>
            A tecnologia deixou de ser apenas uma ferramenta.
            Hoje, ela aprende, interpreta, cria e transforma
            nossa relação com o mundo.
          </Text>
          <Text style={styles.introHighlight}>
            Bem-vindo ao futuro da inteligência.
          </Text>
        </View>

        {/* NÚMEROS */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>05</Text>
            <Text style={styles.statLabel}>EXPOSIÇÕES</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>16+</Text>
            <Text style={styles.statLabel}>ANOS DE EVOLUÇÃO</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>POSSIBILIDADES</Text>
          </View>
        </View>

        {/* EXPOSIÇÕES */}
        <View style={styles.section}>
          <SectionHeading
            eyebrow="01 / COLEÇÃO DIGITAL"
            title="Explore as exposições"
            description="Conheça as tecnologias que construíram a revolução da inteligência artificial."
          />

          {exhibitions.map((item) => (
            <Pressable
              key={item.id}
              style={styles.exhibitionCard}
              onPress={() =>
                navigation.navigate('Exhibition', { topicId: item.id })
              }
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.exhibitionImage}
                imageStyle={styles.exhibitionImageStyle}
              >
                <LinearGradient
                  colors={[
                    'rgba(8,13,24,0.02)',
                    'rgba(8,13,24,0.45)',
                    'rgba(8,13,24,0.97)',
                  ]}
                  style={styles.exhibitionGradient}
                >
                  <View style={styles.exhibitionTop}>
                    <Text style={styles.exhibitionNumber}>{item.number}</Text>
                    <View style={styles.exhibitionIcon}>
                      <Ionicons
                        name={item.icon as any}
                        size={20}
                        color={item.color}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.exhibitionCategory}>
                      {item.category}
                    </Text>
                    <Text style={styles.exhibitionTitle}>{item.title}</Text>
                    <Text style={styles.exhibitionSubtitle}>
                      {item.subtitle}
                    </Text>

                    <View style={styles.exhibitionFooter}>
                      <Text style={styles.exhibitionLink}>VISITAR EXPOSIÇÃO</Text>
                      <Ionicons
                        name="arrow-forward-circle"
                        size={23}
                        color={COLORS.gold}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          ))}
        </View>

        {/* LINHA DO TEMPO */}
        <View style={styles.section}>
          <SectionHeading
            eyebrow="02 / EVOLUÇÃO HISTÓRICA"
            title="Uma jornada no tempo"
            description="Momentos que marcaram a evolução da inteligência artificial."
          />

          <View style={styles.timelineContainer}>
            {timeline.map((item, index) => (
              <View key={item.year} style={styles.timelineItem}>
                <View style={styles.timelineRail}>
                  <View
                    style={[
                      styles.timelineDot,
                      index === timeline.length - 1 &&
                        styles.timelineDotActive,
                    ]}
                  />
                  {index !== timeline.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <Text style={styles.timelineYear}>{item.year}</Text>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CINE IA */}
        <View style={styles.section}>
          <SectionHeading
            eyebrow="03 / CONHECIMENTO EM VÍDEO"
            title="CineIA"
            description="Assista, descubra e aprofunde seus conhecimentos sobre inteligência artificial."
          />

          <Pressable
            style={styles.cineCard}
            onPress={() =>
              navigation.navigate('Exhibition', { topicId: 'generative-ai' })
            }
            accessibilityRole="button"
            accessibilityLabel="Abrir a exposição de IA generativa e assistir ao vídeo"
          >
            <LinearGradient
              colors={['#172943', '#101827', '#0D1523']}
              style={styles.cineVisual}
            >
              <View style={styles.cineGlow}>
                <Ionicons
                  name="play"
                  size={30}
                  color={COLORS.background}
                />
              </View>
              <Text style={styles.cineVisualTitle}>CINEIA</Text>
              <Text style={styles.cineVisualSubtitle}>
                CONHECIMENTO EM MOVIMENTO
              </Text>
            </LinearGradient>

            <View style={styles.cineInfo}>
              <Text style={styles.cineTag}>CONTEÚDO DISPONÍVEL</Text>
              <Text style={styles.cineTitle}>
                A inteligência artificial em vídeo
              </Text>
              <Text style={styles.cineDescription}>
                Entre na exposição de IA generativa para assistir ao vídeo
                integrado e conhecer conceitos, aplicações e impactos da IA.
              </Text>
              <View style={styles.cineFooter}>
                <Ionicons
                  name="videocam-outline"
                  size={17}
                  color={COLORS.gold}
                />
                <Text style={styles.cineFooterText}>
                  ABRIR VÍDEO DA IA GENERATIVA
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* DESAFIO */}
        <View style={styles.challengeSection}>
          <LinearGradient
            colors={['#263B58', '#142238', '#101827']}
            style={styles.challengeCard}
          >
            <View style={styles.challengeIcon}>
              <Ionicons name="bulb-outline" size={28} color={COLORS.gold} />
            </View>

            <Text style={styles.challengeEyebrow}>
              04 / EXPERIÊNCIA INTERATIVA
            </Text>
            <Text style={styles.challengeTitle}>
              Você está preparado para o futuro?
            </Text>
            <Text style={styles.challengeDescription}>
              Teste seus conhecimentos, responda aos desafios
              e descubra o quanto você conhece sobre inteligência artificial.
            </Text>

            <Pressable
              style={styles.challengeButton}
              onPress={() => navigation.navigate('Challenges')}
            >
              <Text style={styles.challengeButtonText}>
                COMEÇAR DESAFIO
              </Text>
              <Ionicons name="arrow-forward" size={17} color={COLORS.gold} />
            </Pressable>

            <View style={styles.challengeDecoration}>
              <Ionicons name="hardware-chip-outline" size={105} color="rgba(217,185,120,0.10)" />
            </View>
          </LinearGradient>
        </View>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Ionicons name="planet-outline" size={23} color={COLORS.gold} />
            <Text style={styles.footerBrand}>MUSEU DIGITAL</Text>
          </View>
          <Text style={styles.footerDescription}>
            Uma experiência educativa sobre a evolução da tecnologia
            e o impacto da inteligência artificial na sociedade.
          </Text>
          <View style={styles.footerDivider} />
          <Text style={styles.footerCopyright}>
            PROJETO ACADÊMICO • 2026
          </Text>
          <Text style={styles.footerCopyright}>
            EXPLORANDO O FUTURO, COMPREENDENDO O PRESENTE.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 35,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 17,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  brandIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#172338',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  brandSubtitle: {
    color: COLORS.muted,
    fontSize: 8,
    letterSpacing: 1.3,
    marginTop: 4,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#73CDA3',
  },
  headerBadgeText: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hero: {
    height: 570,
    marginHorizontal: 13,
    borderRadius: 23,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.surface,
  },
  heroImage: {
    borderRadius: 23,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  heroContent: {
    paddingBottom: 8,
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 19,
  },
  heroLabelLine: {
    width: 27,
    height: 2,
    backgroundColor: COLORS.gold,
  },
  heroLabelText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: '300',
    letterSpacing: 1.2,
  },
  heroTitleGold: {
    color: COLORS.goldLight,
    fontSize: 35,
    fontWeight: '900',
    letterSpacing: 0.4,
    lineHeight: 40,
  },
  heroDescription: {
    color: '#D1D8E2',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 17,
    maxWidth: 310,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 20,
    marginBottom: 22,
  },
  heroMetaText: {
    color: '#E3E8EF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  metaDivider: {
    height: 13,
    width: 1,
    backgroundColor: '#778294',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
    minHeight: 52,
    paddingHorizontal: 19,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 245,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  heroCorner: {
    position: 'absolute',
    top: 20,
    right: 19,
    alignItems: 'flex-end',
  },
  heroCornerNumber: {
    color: COLORS.gold,
    fontSize: 28,
    fontWeight: '200',
  },
  heroCornerText: {
    color: COLORS.white,
    fontSize: 7,
    letterSpacing: 1.3,
  },
  introSection: {
    paddingHorizontal: 25,
    paddingTop: 37,
    paddingBottom: 28,
  },
  introLine: {
    width: 38,
    height: 2,
    backgroundColor: COLORS.gold,
    marginBottom: 17,
  },
  introText: {
    color: COLORS.white,
    fontSize: 20,
    lineHeight: 31,
    fontWeight: '400',
  },
  introHighlight: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 13,
    letterSpacing: 0.3,
  },
  statsContainer: {
    marginHorizontal: 18,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: COLORS.gold,
    fontSize: 25,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 5,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 33,
    backgroundColor: COLORS.border,
  },
  section: {
    paddingHorizontal: 19,
    marginTop: 49,
  },
  sectionHeading: {
    marginBottom: 23,
  },
  eyebrow: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 9,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  sectionDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 9,
  },
  exhibitionCard: {
    height: 245,
    borderRadius: 17,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exhibitionImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exhibitionImageStyle: {
    borderRadius: 17,
  },
  exhibitionGradient: {
    flex: 1,
    padding: 17,
    justifyContent: 'space-between',
  },
  exhibitionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exhibitionNumber: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '200',
  },
  exhibitionIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: 'rgba(8,13,24,0.75)',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exhibitionCategory: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.7,
    marginBottom: 7,
  },
  exhibitionTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '800',
    maxWidth: 290,
  },
  exhibitionSubtitle: {
    color: '#D0D8E2',
    fontSize: 11,
    marginTop: 6,
  },
  exhibitionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  exhibitionLink: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  timelineContainer: {
    paddingTop: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 116,
  },
  timelineRail: {
    width: 29,
    alignItems: 'center',
  },
  timelineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.gold,
    zIndex: 1,
    marginTop: 3,
  },
  timelineDotActive: {
    backgroundColor: COLORS.gold,
    width: 13,
    height: 13,
    borderRadius: 7,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: 'rgba(217,185,120,0.32)',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 13,
    paddingBottom: 25,
  },
  timelineYear: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  timelineTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
  },
  timelineDescription: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 19,
    marginTop: 6,
  },
  cineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cineVisual: {
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cineGlow: {
    width: 59,
    height: 59,
    borderRadius: 30,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cineVisualTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
  },
  cineVisualSubtitle: {
    color: COLORS.gold,
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 5,
  },
  cineInfo: {
    padding: 18,
  },
  cineTag: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  cineTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 9,
  },
  cineDescription: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 19,
    marginTop: 8,
  },
  cineFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  cineFooterText: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  challengeSection: {
    paddingHorizontal: 19,
    marginTop: 48,
  },
  challengeCard: {
    padding: 23,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  challengeIcon: {
    width: 49,
    height: 49,
    borderRadius: 14,
    backgroundColor: 'rgba(217,185,120,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 21,
  },
  challengeEyebrow: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  challengeTitle: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '800',
    marginTop: 10,
    maxWidth: 280,
  },
  challengeDescription: {
    color: '#B8C4D2',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 11,
    maxWidth: 290,
  },
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginTop: 23,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold,
    paddingBottom: 8,
  },
  challengeButtonText: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  challengeDecoration: {
    position: 'absolute',
    right: -10,
    bottom: -12,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 48,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  footerBrand: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerDescription: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 15,
    maxWidth: 290,
  },
  footerDivider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.border,
    marginTop: 24,
    marginBottom: 18,
  },
  footerCopyright: {
    color: '#778294',
    fontSize: 8,
    letterSpacing: 1,
    marginBottom: 7,
    textAlign: 'center',
  },
});
