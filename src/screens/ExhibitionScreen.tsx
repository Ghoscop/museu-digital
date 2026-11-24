
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TopicVideo from '../components/TopicVideo';
import { videosByTopic } from '../data/videos';

import { RootStackParamList } from "../navigation/types";
import { topics } from "../data/topics";

type Props = NativeStackScreenProps<RootStackParamList, "Exhibition">;

const visualData: Record<
  string,
  {
    image: string;
    gallery: string[];
    introduction: string;
    importance: string;
    timeline: { year: string; title: string; description: string }[];
  }
> = {
  cloud: {
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    ],
    introduction:
      "A computação em nuvem representa uma mudança importante na história da informática: recursos que antes dependiam de equipamentos locais passaram a ser oferecidos por meio da internet.",
    importance:
      "A nuvem permite que pessoas e organizações utilizem armazenamento, processamento e aplicações pela internet. Isso ampliou o acesso a serviços digitais, facilitou o trabalho remoto e transformou a infraestrutura de empresas.",
    timeline: [
      {
        year: "2010",
        title: "Expansão dos serviços em nuvem",
        description:
          "Armazenamento e aplicações online ganham espaço entre usuários e empresas.",
      },
      {
        year: "2014",
        title: "Crescimento das plataformas",
        description:
          "Grandes provedores ampliam serviços de infraestrutura e computação.",
      },
      {
        year: "2018",
        title: "Nuvem híbrida e múltiplas plataformas",
        description:
          "Empresas passam a combinar diferentes ambientes de computação.",
      },
      {
        year: "2020 — presente",
        title: "Infraestrutura digital essencial",
        description:
          "A nuvem sustenta serviços, colaboração, análise de dados e aplicações modernas.",
      },
    ],
  },

  mobile: {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    ],
    introduction:
      "Os dispositivos móveis passaram de ferramentas de comunicação para plataformas completas de acesso à informação, serviços, entretenimento e trabalho.",
    importance:
      "A popularização dos smartphones modificou hábitos sociais e econômicos. Aplicativos, câmeras, sensores, redes móveis e sistemas operacionais tornaram o celular uma das principais portas de entrada para o mundo digital.",
    timeline: [
      {
        year: "2010",
        title: "Consolidação dos smartphones",
        description:
          "Os celulares inteligentes ampliam sua presença no cotidiano.",
      },
      {
        year: "2013",
        title: "Aplicativos em expansão",
        description:
          "Lojas de aplicativos e serviços móveis transformam experiências digitais.",
      },
      {
        year: "2019",
        title: "Novas gerações de conectividade",
        description:
          "A expansão do 5G começa a abrir novas possibilidades de comunicação.",
      },
      {
        year: "2020 — presente",
        title: "Mobilidade em todos os lugares",
        description:
          "Pagamentos, educação, trabalho e serviços passam a depender cada vez mais dos dispositivos móveis.",
      },
    ],
  },

  "machine-learning": {
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    ],
    introduction:
      "A aprendizagem de máquina, também conhecida como Machine Learning, é uma área da inteligência artificial que desenvolve sistemas capazes de identificar padrões a partir de dados.",
    importance:
      "Essa tecnologia está presente em recomendações de conteúdo, reconhecimento de imagens, análise de informações, detecção de fraudes e diversas outras aplicações. Seu desenvolvimento depende da combinação de dados, algoritmos e capacidade computacional.",
    timeline: [
      {
        year: "2012",
        title: "Avanços do aprendizado profundo",
        description:
          "Redes neurais profundas conquistam resultados importantes em reconhecimento de imagens.",
      },
      {
        year: "2015",
        title: "Expansão das aplicações",
        description:
          "A aprendizagem de máquina ganha espaço em produtos e serviços digitais.",
      },
      {
        year: "2018",
        title: "Modelos mais avançados",
        description:
          "Novas arquiteturas ampliam as possibilidades de processamento de linguagem e dados.",
      },
      {
        year: "2020 — presente",
        title: "IA em diferentes setores",
        description:
          "Sistemas de aprendizagem são utilizados em saúde, educação, indústria e comércio.",
      },
    ],
  },

  "generative-ai": {
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
    ],
    introduction:
      "A inteligência artificial generativa ganhou grande visibilidade ao permitir que sistemas produzam novos conteúdos, como textos, imagens, sons, vídeos e códigos.",
    importance:
      "Essas ferramentas ampliam possibilidades de criação, pesquisa, educação e desenvolvimento de software. Ao mesmo tempo, levantam questões sobre direitos autorais, confiabilidade das informações, privacidade e uso responsável da tecnologia.",
    timeline: [
      {
        year: "2017",
        title: "Arquitetura Transformer",
        description:
          "Uma nova arquitetura de redes neurais abre caminhos importantes para modelos de linguagem.",
      },
      {
        year: "2021",
        title: "Avanços na geração de imagens",
        description:
          "Modelos generativos ampliam a capacidade de criar imagens a partir de descrições.",
      },
      {
        year: "2022",
        title: "Popularização da IA generativa",
        description:
          "Ferramentas generativas passam a alcançar um público muito mais amplo.",
      },
      {
        year: "2023 — presente",
        title: "Expansão multimodal",
        description:
          "Modelos passam a trabalhar com diferentes tipos de informação e interação.",
      },
    ],
  },

  cybersecurity: {
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    ],
    introduction:
      "A segurança digital reúne práticas, tecnologias e processos utilizados para proteger dispositivos, redes, sistemas e informações contra ameaças digitais.",
    importance:
      "Com o crescimento da conectividade, proteger dados tornou-se fundamental para pessoas, empresas e instituições. Senhas seguras, autenticação multifator, criptografia e conscientização ajudam a reduzir riscos.",
    timeline: [
      {
        year: "2010",
        title: "Crescimento das ameaças digitais",
        description:
          "A expansão dos serviços conectados amplia os desafios de proteção de informações.",
      },
      {
        year: "2013",
        title: "Privacidade em destaque",
        description:
          "Debates sobre vigilância, coleta de dados e privacidade ganham visibilidade.",
      },
      {
        year: "2017",
        title: "Ataques em escala global",
        description:
          "Incidentes de ransomware evidenciam os riscos para organizações e serviços.",
      },
      {
        year: "2020 — presente",
        title: "Proteção de dados e identidade",
        description:
          "A segurança passa a ser parte central da transformação digital.",
      },
    ],
  },
};

export default function ExhibitionScreen({ route }: Props) {
  const topic = topics.find(
    (item) => item.id === route.params.topicId
  );

  if (!topic) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={48} color="#D9B978" />
        <Text style={styles.notFoundTitle}>Exposição não encontrada</Text>
        <Text style={styles.notFoundText}>
          Não foi possível localizar este conteúdo no acervo.
        </Text>
      </View>
    );
  }

  const visual = visualData[topic.id] || visualData.cloud;
  const video = videosByTopic[topic.id];

  const openArticles = () => {
    const query = encodeURIComponent(topic.title + " história tecnologia");
    Linking.openURL("https://www.google.com/search?q=" + query);
  };



  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#080D18" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CAPA DA EXPOSIÇÃO */}
        <ImageBackground
          source={{ uri: visual.image }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={["rgba(5,10,20,0.08)", "rgba(5,10,20,0.96)"]}
            style={styles.heroGradient}
          >
            <View style={styles.heroTag}>
              <Ionicons name="library-outline" size={15} color="#D9B978" />
              <Text style={styles.heroTagText}>ACERVO DIGITAL</Text>
            </View>

            <Text style={styles.heroAxis}>{topic.axis.toUpperCase()}</Text>

            <Text style={styles.heroTitle}>{topic.title}</Text>

            <Text style={styles.heroSubtitle}>{topic.subtitle}</Text>

            <View style={styles.period}>
              <Ionicons name="time-outline" size={17} color="#D9B978" />
              <Text style={styles.periodText}>{topic.year}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* VÍDEO DA EXPOSIÇÃO */}
        <View style={styles.darkSection}>
          <Text style={styles.eyebrow}>01 — CONTEÚDO EM VÍDEO</Text>
          <Text style={styles.sectionTitle}>Assista antes de explorar</Text>
          <Text style={styles.sectionDescription}>
            Uma introdução audiovisual para contextualizar o tema desta exposição.
          </Text>

          {video ? (
            <View style={styles.videoCard}>
              <TopicVideo
                videoId={video.videoId}
                title={video.title}
                channel={video.channel}
                description={video.description}
              />
            </View>
          ) : (
            <View style={styles.videoUnavailable}>
              <Ionicons name="videocam-off-outline" size={25} color="#D9B978" />
              <Text style={styles.videoUnavailableText}>
                O vídeo desta exposição será disponibilizado em breve.
              </Text>
            </View>
          )}
        </View>

        {/* INTRODUÇÃO */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>02 — APRESENTAÇÃO</Text>
          <Text style={styles.sectionTitle}>Uma viagem pela tecnologia</Text>

          <Text style={styles.bodyText}>{visual.introduction}</Text>

          <View style={styles.quoteBox}>
            <View style={styles.quoteLine} />
            <Text style={styles.quoteText}>{topic.description}</Text>
          </View>
        </View>

        {/* SOBRE A TECNOLOGIA */}
        <View style={styles.darkSection}>
          <Text style={styles.eyebrow}>03 — CONTEXTO HISTÓRICO</Text>
          <Text style={styles.sectionTitle}>Por que ela é importante?</Text>

          <Text style={styles.bodyText}>{visual.importance}</Text>

          <View style={styles.infoCard}>
            <Ionicons
              name="bulb-outline"
              size={26}
              color="#D9B978"
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Você sabia?</Text>
              <Text style={styles.infoDescription}>
                A evolução tecnológica não acontece isoladamente. Ela depende
                de descobertas científicas, infraestrutura, inovação e
                transformações sociais.
              </Text>
            </View>
          </View>
        </View>

        {/* CAPÍTULOS */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>04 — CONHECIMENTO</Text>
          <Text style={styles.sectionTitle}>Explore os capítulos</Text>

          <Text style={styles.sectionDescription}>
            Conheça os principais aspectos desta tecnologia.
          </Text>

          {topic.content.map((paragraph, index) => (
            <View style={styles.chapterCard} key={index}>
              <View style={styles.chapterNumber}>
                <Text style={styles.chapterNumberText}>
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </View>

              <View style={styles.chapterContent}>
                <Text style={styles.chapterTitle}>
                  {[
                    "Origem e desenvolvimento",
                    "Aplicações e transformações",
                    "Impactos na sociedade",
                  ][index] || "Conhecimento complementar"}
                </Text>
                <Text style={styles.chapterText}>{paragraph}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* LINHA DO TEMPO */}
        <View style={styles.darkSection}>
          <Text style={styles.eyebrow}>05 — CRONOLOGIA</Text>
          <Text style={styles.sectionTitle}>A evolução ao longo do tempo</Text>

          <Text style={styles.sectionDescription}>
            Alguns marcos importantes para compreender a trajetória desta
            tecnologia.
          </Text>

          <View style={styles.timeline}>
            {visual.timeline.map((item, index) => (
              <View style={styles.timelineItem} key={item.year}>
                <View style={styles.timelineTrack}>
                  <View style={styles.timelineDot} />
                  {index !== visual.timeline.length - 1 && (
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

        {/* GALERIA */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>06 — ACERVO VISUAL</Text>
          <Text style={styles.sectionTitle}>Galeria da exposição</Text>

          <Text style={styles.sectionDescription}>
            Imagens ilustrativas relacionadas ao universo desta tecnologia.
          </Text>

          {visual.gallery.map((image, index) => (
            <View style={styles.galleryCard} key={index}>
              <Image
                source={{ uri: image }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.galleryCaption}>
                {topic.title} • Registro visual {index + 1}
              </Text>
            </View>
          ))}
        </View>

        {/* ARTIGOS */}
        <View style={styles.darkSection}>
          <Text style={styles.eyebrow}>07 — BIBLIOTECA</Text>
          <Text style={styles.sectionTitle}>Continue sua pesquisa</Text>

          <Text style={styles.sectionDescription}>
            Explore materiais complementares e aprofunde seu conhecimento.
          </Text>

          <TouchableOpacity
            style={styles.resourceCard}
            onPress={openArticles}
            activeOpacity={0.8}
          >
            <View style={styles.resourceIcon}>
              <Ionicons
                name="newspaper-outline"
                size={25}
                color="#D9B978"
              />
            </View>

            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Artigos e pesquisas</Text>
              <Text style={styles.resourceDescription}>
                Consulte materiais e publicações sobre {topic.title}.
              </Text>
            </View>

            <Ionicons name="open-outline" size={20} color="#D9B978" />
          </TouchableOpacity>

        </View>

        {/* ENCERRAMENTO */}
        <View style={styles.closing}>
          <Ionicons name="school-outline" size={35} color="#D9B978" />

          <Text style={styles.closingTitle}>Fim da exposição</Text>

          <Text style={styles.closingText}>
            Você chegou ao final desta visita. Continue explorando o acervo e
            descubra como a tecnologia transforma o mundo.
          </Text>

          <Text style={styles.closingReference}>
            MUSEU DIGITAL • ERA DIGITAL E INTELIGÊNCIA ARTIFICIAL
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#080D18",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  notFound: {
    flex: 1,
    backgroundColor: "#080D18",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  notFoundTitle: {
    color: "#F4F1E9",
    fontSize: 21,
    fontWeight: "800",
    marginTop: 18,
  },

  notFoundText: {
    color: "#A7B1C0",
    fontSize: 14,
    textAlign: "center",
    marginTop: 9,
  },

  hero: {
    height: 390,
    backgroundColor: "#17263B",
  },

  heroImage: {
    opacity: 0.95,
  },

  heroGradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 23,
  },

  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 19,
  },

  heroTagText: {
    color: "#E8D5A8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  heroAxis: {
    color: "#D9B978",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 9,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 39,
  },

  heroSubtitle: {
    color: "#D5DCE5",
    fontSize: 14,
    marginTop: 9,
  },

  period: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 19,
  },

  periodText: {
    color: "#E8D5A8",
    fontSize: 12,
    fontWeight: "800",
  },

  section: {
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 32,
  },

  darkSection: {
    backgroundColor: "#101827",
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 32,
  },

  eyebrow: {
    color: "#D9B978",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 11,
  },

  sectionTitle: {
    color: "#F4F1E9",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
  },

  bodyText: {
    color: "#A7B1C0",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 15,
  },

  quoteBox: {
    flexDirection: "row",
    backgroundColor: "#111B2B",
    padding: 17,
    borderRadius: 13,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#263449",
  },

  quoteLine: {
    width: 3,
    backgroundColor: "#D9B978",
    borderRadius: 2,
    marginRight: 13,
  },

  quoteText: {
    color: "#E8D5A8",
    fontSize: 13,
    lineHeight: 22,
    flex: 1,
    fontStyle: "italic",
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#17263B",
    borderRadius: 15,
    padding: 17,
    marginTop: 23,
    gap: 13,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    color: "#F4F1E9",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 7,
  },

  infoDescription: {
    color: "#A7B1C0",
    fontSize: 12,
    lineHeight: 20,
  },

  sectionDescription: {
    color: "#98A6B8",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 22,
  },

  chapterCard: {
    flexDirection: "row",
    backgroundColor: "#111B2B",
    padding: 16,
    borderRadius: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#263449",
    gap: 13,
  },

  chapterNumber: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: "#263449",
    alignItems: "center",
    justifyContent: "center",
  },

  chapterNumberText: {
    color: "#D9B978",
    fontWeight: "900",
    fontSize: 12,
  },

  chapterContent: {
    flex: 1,
  },

  chapterTitle: {
    color: "#F4F1E9",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
  },

  chapterText: {
    color: "#A7B1C0",
    fontSize: 13,
    lineHeight: 22,
  },

  timeline: {
    marginTop: 12,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 112,
  },

  timelineTrack: {
    width: 26,
    alignItems: "center",
  },

  timelineDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#D9B978",
    borderWidth: 3,
    borderColor: "#65583C",
    zIndex: 1,
  },

  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#455166",
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 13,
    paddingBottom: 24,
  },

  timelineYear: {
    color: "#D9B978",
    fontSize: 12,
    fontWeight: "900",
  },

  timelineTitle: {
    color: "#F4F1E9",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 6,
  },

  timelineDescription: {
    color: "#98A6B8",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },

  galleryCard: {
    marginBottom: 19,
    backgroundColor: "#111B2B",
    borderRadius: 14,
    overflow: "hidden",
  },

  galleryImage: {
    width: "100%",
    height: 205,
    backgroundColor: "#17263B",
  },

  galleryCaption: {
    color: "#A7B1C0",
    fontSize: 11,
    padding: 13,
  },

  videoCard: {
    backgroundColor: "#080D18",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#263449",
    overflow: "hidden",
  },

  videoUnavailable: {
    minHeight: 105,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#263449",
    backgroundColor: "#111B2B",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  videoUnavailableText: {
    flex: 1,
    color: "#A7B1C0",
    fontSize: 13,
    lineHeight: 20,
  },

  resourceCard: {
    backgroundColor: "#17263B",
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 12,
  },

  resourceIcon: {
    width: 46,
    height: 46,
    backgroundColor: "#263449",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  resourceInfo: {
    flex: 1,
  },

  resourceTitle: {
    color: "#F4F1E9",
    fontSize: 14,
    fontWeight: "800",
  },

  resourceDescription: {
    color: "#98A6B8",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  closing: {
    paddingHorizontal: 25,
    paddingTop: 35,
    alignItems: "center",
  },

  closingTitle: {
    color: "#F4F1E9",
    fontSize: 23,
    fontWeight: "900",
    marginTop: 15,
  },

  closingText: {
    color: "#98A6B8",
    fontSize: 13,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 11,
  },

  closingReference: {
    color: "#D9B978",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.1,
    textAlign: "center",
    marginTop: 26,
  },
});
