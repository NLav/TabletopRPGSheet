import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc, getDoc, addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import Navbar from "./Components/navbar";
import db from "./Config/firebase";
import SkillsList from "./Components/skills-list";
import AtrCombobox from "./Components/atr-combobox";
import AttackList from "./Components/attacks-list";
import AttackPopup from "./Components/attack-popup";
import ItemsList from "./Components/items-list";
import ItemPopup from "./Components/item-popup";
import ItemsTotalWeight from "./Components/items-total-weight";
import SpellsList from "./Components/spells-list";
import SpellPopup from "./Components/spell-popup";
import FeaturesList from "./Components/features-list";
import FeaturePopup from "./Components/feature-popup";
import { UserContext } from "./Context/user";
import RollDicePopup from "./Components/roll-dice-popup";
import "./pages.css";
import MoneyPopup from "./Components/money-popup";

export default function Sheet() {
    {/* Identificador de usuário logado */ }
    const { userId } = React.useContext(UserContext)
    {/* Cabeçalho */ }
    const [personagem, setPersonagem] = useState("");
    const [jogador, setJogador] = useState("");
    const [campanha, setCampanha] = useState("");
    const [raca, setRaca] = useState("");
    const [origem, setOrigem] = useState("");
    const [classe, setClasse] = useState("");
    const [nivel, setNivel] = useState(1);
    const [divindade, setDivindade] = useState("");
    {/* Rolar dados */ }
    const [rolarTrigger, setRolarTrigger] = useState(false);
    const [dados, setDados] = useState(0);
    const [faces, setFaces] = useState(0);
    const [modificadorSomar, setModificadorSomar] = useState(0);
    const [modificadorSubtrair, setModificadorSubtrair] = useState(0);
    const [rollAnimation, setRollAnimation] = useState(false);
    {/* Atributos */ }
    const [forcaAtributo, setForcaAtributo] = useState(10);
    const [forcaModificador, setForcaModificador] = useState(0);
    const [destrezaAtributo, setDestrezaAtributo] = useState(10);
    const [destrezaModificador, setDestrezaModificador] = useState(0);
    const [constituicaoAtributo, setConstituicaoAtributo] = useState(10);
    const [constituicaoModificador, setConstituicaoModificador] = useState(0);
    const [inteligenciaAtributo, setInteligenciaAtributo] = useState(10);
    const [inteligenciaModificador, setInteligenciaModificador] = useState(0);
    const [sabedoriaAtributo, setSabedoriaAtributo] = useState(10);
    const [sabedoriaModificador, setSabedoriaModificador] = useState(0);
    const [carismaAtributo, setCarismaAtributo] = useState(10);
    const [carismaModificador, setCarismaModificador] = useState(0);
    {/* Pontos */ }
    const [pontosCollapse, setPontosCollapse] = useState(true);
    const [pvAtual, setPvAtual] = useState(0);
    const [pmAtual, setPmAtual] = useState(0);
    const [pvMaximo, setPvMaximo] = useState(0);
    const [pmMaximo, setPmMaximo] = useState(0);
    {/* Ataques */ }
    const [ataqueCollapse, setAtaqueCollapse] = useState(true);
    const [ataqueEditId, setAtaqueEditId] = useState(-1);
    const [ataqueNome, setAtaqueNome] = useState("");
    const [ataqueTeste, setAtaqueTeste] = useState("");
    const [ataqueDano, setAtaqueDano] = useState("");
    const [ataqueCritico, setAtaqueCritico] = useState("");
    const [ataqueTipo, setAtaqueTipo] = useState("");
    const [ataqueAlcance, setAtaqueAlcance] = useState("");
    const [ataqueDescricao, setAtaqueDescricao] = useState("");
    const [ataquePopup, setAtaquePopup] = useState(false);
    const [arrayAtaques, setArrayAtaques] = useState([]);
    {/* Magias */ }
    const [magiaCollapse, setMagiaCollapse] = useState(true);
    const [magiaEditId, setMagiaEditId] = useState(-1);
    const [magiaNome, setMagiaNome] = useState("");
    const [magiaEscola, setMagiaEscola] = useState("");
    const [magiaExecucao, setMagiaExecucao] = useState("");
    const [magiaAlcance, setMagiaAlcance] = useState("");
    const [magiaAlvo, setMagiaAlvo] = useState("");
    const [magiaDuracao, setMagiaDuracao] = useState("");
    const [magiaResistencia, setMagiaResistencia] = useState("");
    const [magiaDescricao, setMagiaDescricao] = useState("");
    const [magiaPopup, setMagiaPopup] = useState(false);
    const [arrayMagias, setArrayMagias] = useState([]);
    const [resistenciaMagiaMod, setResistenciaMagiaMod] = useState("int");
    {/* Defesa */ }
    const [defesaCollapse, setDefesaCollapse] = useState(true);
    const [defesaValor, setDefesaValor] = useState(0);
    const [defesaMod, setDefesaMod] = useState("des");
    const [defesaOutros, setDefesaOutros] = useState(0);
    {/* Armadura e Escudo */ }
    const [armEscCollapse, setArmEscCollapse] = useState(true);
    const [armaduraNome, setArmaduraNome] = useState("");
    const [armaduraDefesa, setArmaduraDefesa] = useState(0);
    const [armaduraPenalidade, setArmaduraPenalidade] = useState(0);
    const [escudoNome, setEscudoNome] = useState("");
    const [escudoDefesa, setEscudoDefesa] = useState(0);
    const [escudoPenalidade, setEscudoPenalidade] = useState(0);
    {/* Inventário */ }
    const [itemCollapse, setItemCollapse] = useState(true);
    const [itemEditId, setItemEditId] = useState(-1);
    const [dinheiroValor, setDinheiroValor] = useState(0);
    const [dinheiroPopup, setDinheiroPopup] = useState(false);
    const [itemNome, setItemNome] = useState("");
    const [itemPeso, setItemPeso] = useState(0);
    const [itemValor, setItemValor] = useState(0);
    const [itemPopup, setItemPopup] = useState(false);
    const [arrayItens, setArrayItens] = useState([]);
    {/* Habilidades e Poderes */ }
    const [habilidadesCollapse, setHabilidadesCollapse] = useState(true);
    const [habilidadeEditId, setHabilidadeEditId] = useState(-1);
    const [habilidadeNome, setHabilidadeNome] = useState("");
    const [habilidadeDescricao, setHabilidadeDescricao] = useState("");
    const [habilidadeRacaCollapse, setHabilidadeRacaCollapse] = useState(true);
    const [arrayHabilidadesRaca, setArrayHabilidadesRaca] = useState([]);
    const [habilidadesRacaPopup, setHabilidadesRacaPopup] = useState(false);
    const [habilidadeOrigemCollapse, setHabilidadeOrigemCollapse] = useState(true);
    const [arrayHabilidadesOrigem, setArrayHabilidadesOrigem] = useState([]);
    const [habilidadesOrigemPopup, setHabilidadesOrigemPopup] = useState(false);
    const [habilidadeClasseCollapse, setHabilidadeClasseCollapse] = useState(true);
    const [arrayHabilidadesClasse, setArrayHabilidadesClasse] = useState([]);
    const [habilidadesClassePopup, setHabilidadesClassePopup] = useState(false);
    const [habilidadePoderesCollapse, setHabilidadePoderesCollapse] = useState(true);
    const [arrayPoderes, setArrayPoderes] = useState([]);
    const [poderesPopup, setPoderesPopup] = useState(false);
    {/* Sobre o personagem */ }
    const [sobreCollapse, setSobreCollapse] = useState(true);
    const [sobreProficienciaCollapse, setSobreProficienciaCollapse] = useState(true);
    const [sobreProficiencia, setSobreProficiencia] = useState("");
    const [sobreHistoriaCollapse, setSobreHistoriaCollapse] = useState(true);
    const [sobreHistoria, setSobreHistoria] = useState("");
    {/* Anotações */ }
    const [anotacoesCollapse, setAnotacoesCollapse] = useState(true);
    const [anotacoes, setAnotacoes] = useState("");
    {/* Genéricos da página */ }
    const [message, setMessage] = useState("");
    const [docDone, setDocDone] = useState(false);
    {/* Rolar dados */ }
    const [rolarDadosPopup, setRolarDadosPopup] = useState(false);
    {/* Tabela perícias */ }
    const [acrobaciaPericia, setAcrobaciaPericia] = useState(0); const [outrosAcrobaciaPericiaValor, setOutrosAcrobaciaPericiaValor] = useState(0); const [treinoAcrobaciaPericiaValor, setTreinoAcrobaciaPericiaValor] = useState(false);
    const [adestramentoPericia, setAdestramentoPericia] = useState(0); const [outrosAdestramentoPericiaValor, setOutrosAdestramentoPericiaValor] = useState(0); const [treinoAdestramentoPericiaValor, setTreinoAdestramentoPericiaValor] = useState(false);
    const [atletismoPericia, setAtletismoPericia] = useState(0); const [treinoAtletismoPericiaValor, setTreinoAtletismoPericiaValor] = useState(false); const [outrosAtletismoPericiaValor, setOutrosAtletismoPericiaValor] = useState(0);
    const [atuacaoPericia, setAtuacaoPericia] = useState(0); const [treinoAtuacaoPericiaValor, setTreinoAtuacaoPericiaValor] = useState(false); const [outrosAtuacaoPericiaValor, setOutrosAtuacaoPericiaValor] = useState(0);
    const [cavalgarPericia, setCavalgarPericia] = useState(0); const [treinoCavalgarPericiaValor, setTreinoCavalgarPericiaValor] = useState(false); const [outrosCavalgarPericiaValor, setOutrosCavalgarPericiaValor] = useState(0);
    const [conhecimentoPericia, setConhecimentoPericia] = useState(0); const [treinoConhecimentoPericiaValor, setTreinoConhecimentoPericiaValor] = useState(false); const [outrosConhecimentoPericiaValor, setOutrosConhecimentoPericiaValor] = useState(0);
    const [curaPericia, setCuraPericia] = useState(0); const [treinoCuraPericiaValor, setTreinoCuraPericiaValor] = useState(false); const [outrosCuraPericiaValor, setOutrosCuraPericiaValor] = useState(0);
    const [diplomaciaPericia, setDiplomaciaPericia] = useState(0); const [treinoDiplomaciaPericiaValor, setTreinoDiplomaciaPericiaValor] = useState(false); const [outrosDiplomaciaPericiaValor, setOutrosDiplomaciaPericiaValor] = useState(0);
    const [enganacaoPericia, setEnganacaoPericia] = useState(0); const [treinoEnganacaoPericiaValor, setTreinoEnganacaoPericiaValor] = useState(false); const [outrosEnganacaoPericiaValor, setOutrosEnganacaoPericiaValor] = useState(0);
    const [fortitudePericia, setFortitudePericia] = useState(0); const [treinoFortitudePericiaValor, setTreinoFortitudePericiaValor] = useState(false); const [outrosFortitudePericiaValor, setOutrosFortitudePericiaValor] = useState(0);
    const [furtividadePericia, setFurtividadePericia] = useState(0); const [treinoFurtividadePericiaValor, setTreinoFurtividadePericiaValor] = useState(false); const [outrosFurtividadePericiaValor, setOutrosFurtividadePericiaValor] = useState(0);
    const [guerraPericia, setGuerraPericia] = useState(0); const [treinoGuerraPericiaValor, setTreinoGuerraPericiaValor] = useState(false); const [outrosGuerraPericiaValor, setOutrosGuerraPericiaValor] = useState(0);
    const [iniciativaPericia, setIniciativaPericia] = useState(0); const [treinoIniciativaPericiaValor, setTreinoIniciativaPericiaValor] = useState(false); const [outrosIniciativaPericiaValor, setOutrosIniciativaPericiaValor] = useState(0);
    const [intimidacaoPericia, setIntimidacaoPericia] = useState(0); const [treinoIntimidacaoPericiaValor, setTreinoIntimidacaoPericiaValor] = useState(false); const [outrosIntimidacaoPericiaValor, setOutrosIntimidacaoPericiaValor] = useState(0);
    const [intuicaoPericia, setIntuicaoPericia] = useState(0); const [treinoIntuicaoPericiaValor, setTreinoIntuicaoPericiaValor] = useState(false); const [outrosIntuicaoPericiaValor, setOutrosIntuicaoPericiaValor] = useState(0);
    const [investigacaoPericia, setInvestigacaoPericia] = useState(0); const [treinoInvestigacaoPericiaValor, setTreinoInvestigacaoPericiaValor] = useState(false); const [outrosInvestigacaoPericiaValor, setOutrosInvestigacaoPericiaValor] = useState(0);
    const [jogatinaPericia, setJogatinaPericia] = useState(0); const [treinoJogatinaPericiaValor, setTreinoJogatinaPericiaValor] = useState(false); const [outrosJogatinaPericiaValor, setOutrosJogatinaPericiaValor] = useState(0);
    const [ladinagemPericia, setLadinagemPericia] = useState(0); const [treinoLadinagemPericiaValor, setTreinoLadinagemPericiaValor] = useState(false); const [outrosLadinagemPericiaValor, setOutrosLadinagemPericiaValor] = useState(0);
    const [lutaPericia, setLutaPericia] = useState(0); const [treinoLutaPericiaValor, setTreinoLutaPericiaValor] = useState(false); const [outrosLutaPericiaValor, setOutrosLutaPericiaValor] = useState(0);
    const [misticismoPericia, setMisticismoPericia] = useState(0); const [treinoMisticismoPericiaValor, setTreinoMisticismoPericiaValor] = useState(false); const [outrosMisticismoPericiaValor, setOutrosMisticismoPericiaValor] = useState(0);
    const [nobrezaPericia, setNobrezaPericia] = useState(0); const [treinoNobrezaPericiaValor, setTreinoNobrezaPericiaValor] = useState(false); const [outrosNobrezaPericiaValor, setOutrosNobrezaPericiaValor] = useState(0);
    const [oficio1Pericia, setOficio1Pericia] = useState(0); const [treinoOficio1PericiaValor, setTreinoOficio1PericiaValor] = useState(false); const [outrosOficio1PericiaValor, setOutrosOficio1PericiaValor] = useState(0);
    const [oficio2Pericia, setOficio2Pericia] = useState(0); const [treinoOficio2PericiaValor, setTreinoOficio2PericiaValor] = useState(false); const [outrosOficio2PericiaValor, setOutrosOficio2PericiaValor] = useState(0);
    const [percepcaoPericia, setPercepcaoPericia] = useState(0); const [treinoPercepcaoPericiaValor, setTreinoPercepcaoPericiaValor] = useState(false); const [outrosPercepcaoPericiaValor, setOutrosPercepcaoPericiaValor] = useState(0);
    const [pilotagemPericia, setPilotagemPericia] = useState(0); const [treinoPilotagemPericiaValor, setTreinoPilotagemPericiaValor] = useState(false); const [outrosPilotagemPericiaValor, setOutrosPilotagemPericiaValor] = useState(0);
    const [pontariaPericia, setPontariaPericia] = useState(0); const [treinoPontariaPericiaValor, setTreinoPontariaPericiaValor] = useState(false); const [outrosPontariaPericiaValor, setOutrosPontariaPericiaValor] = useState(0);
    const [reflexosPericia, setReflexosPericia] = useState(0); const [treinoReflexosPericiaValor, setTreinoReflexosPericiaValor] = useState(false); const [outrosReflexosPericiaValor, setOutrosReflexosPericiaValor] = useState(0);
    const [religiaoPericia, setReligiaoPericia] = useState(0); const [treinoReligiaoPericiaValor, setTreinoReligiaoPericiaValor] = useState(false); const [outrosReligiaoPericiaValor, setOutrosReligiaoPericiaValor] = useState(0);
    const [sobrevivenciaPericia, setSobrevivenciaPericia] = useState(0); const [treinoSobrevivenciaPericiaValor, setTreinoSobrevivenciaPericiaValor] = useState(false); const [outrosSobrevivenciaPericiaValor, setOutrosSobrevivenciaPericiaValor] = useState(0);
    const [vontadePericia, setVontadePericia] = useState(0); const [treinoVontadePericiaValor, setTreinoVontadePericiaValor] = useState(false); const [outrosVontadePericiaValor, setOutrosVontadePericiaValor] = useState(0);

    var arraySkills = [
        { treinoInput: TreinoPericia(treinoAcrobaciaPericiaValor, setTreinoAcrobaciaPericiaValor), treinado: treinoAcrobaciaPericiaValor, nome: "Acrobacia ÷", total: acrobaciaPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosAcrobaciaPericiaValor, setOutrosAcrobaciaPericiaValor), outrosValor: parseInt(outrosAcrobaciaPericiaValor), },
        { treinoInput: TreinoPericia(treinoAdestramentoPericiaValor, setTreinoAdestramentoPericiaValor), treinado: treinoAdestramentoPericiaValor, nome: "Adestramento *", total: adestramentoPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosAdestramentoPericiaValor, setOutrosAdestramentoPericiaValor), outrosValor: parseInt(outrosAdestramentoPericiaValor), },
        { treinoInput: TreinoPericia(treinoAtletismoPericiaValor, setTreinoAtletismoPericiaValor), treinado: treinoAtletismoPericiaValor, nome: "Atletismo", total: atletismoPericia, nivelTotal: nivel, atributo: "FOR", modAtributo: forcaModificador, outrosInput: OutrosPericia(outrosAtletismoPericiaValor, setOutrosAtletismoPericiaValor), outrosValor: parseInt(outrosAtletismoPericiaValor), },
        { treinoInput: TreinoPericia(treinoAtuacaoPericiaValor, setTreinoAtuacaoPericiaValor), treinado: treinoAtuacaoPericiaValor, nome: "Atuacao", total: atuacaoPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosAtuacaoPericiaValor, setOutrosAtuacaoPericiaValor), outrosValor: parseInt(outrosAtuacaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoCavalgarPericiaValor, setTreinoCavalgarPericiaValor), treinado: treinoCavalgarPericiaValor, nome: "Cavalgar", total: cavalgarPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosCavalgarPericiaValor, setOutrosCavalgarPericiaValor), outrosValor: parseInt(outrosCavalgarPericiaValor), },
        { treinoInput: TreinoPericia(treinoConhecimentoPericiaValor, setTreinoConhecimentoPericiaValor), treinado: treinoConhecimentoPericiaValor, nome: "Conhecimento *", total: conhecimentoPericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosConhecimentoPericiaValor, setOutrosConhecimentoPericiaValor), outrosValor: parseInt(outrosConhecimentoPericiaValor), },
        { treinoInput: TreinoPericia(treinoCuraPericiaValor, setTreinoCuraPericiaValor), treinado: treinoCuraPericiaValor, nome: "Cura", total: curaPericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosCuraPericiaValor, setOutrosCuraPericiaValor), outrosValor: parseInt(outrosCuraPericiaValor), },
        { treinoInput: TreinoPericia(treinoDiplomaciaPericiaValor, setTreinoDiplomaciaPericiaValor), treinado: treinoDiplomaciaPericiaValor, nome: "Diplomacia", total: diplomaciaPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosDiplomaciaPericiaValor, setOutrosDiplomaciaPericiaValor), outrosValor: parseInt(outrosDiplomaciaPericiaValor), },
        { treinoInput: TreinoPericia(treinoEnganacaoPericiaValor, setTreinoEnganacaoPericiaValor), treinado: treinoEnganacaoPericiaValor, nome: "Enganação", total: enganacaoPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosEnganacaoPericiaValor, setOutrosEnganacaoPericiaValor), outrosValor: parseInt(outrosEnganacaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoFortitudePericiaValor, setTreinoFortitudePericiaValor), treinado: treinoFortitudePericiaValor, nome: "Fortitude", total: fortitudePericia, nivelTotal: nivel, atributo: "CON", modAtributo: constituicaoModificador, outrosInput: OutrosPericia(outrosFortitudePericiaValor, setOutrosFortitudePericiaValor), outrosValor: parseInt(outrosFortitudePericiaValor), },
        { treinoInput: TreinoPericia(treinoFurtividadePericiaValor, setTreinoFurtividadePericiaValor), treinado: treinoFurtividadePericiaValor, nome: "Furtividade ÷", total: parseInt(furtividadePericia), nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosFurtividadePericiaValor, setOutrosFurtividadePericiaValor), outrosValor: parseInt(outrosFurtividadePericiaValor), },
        { treinoInput: TreinoPericia(treinoGuerraPericiaValor, setTreinoGuerraPericiaValor), treinado: treinoGuerraPericiaValor, nome: "Guerra *", total: guerraPericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosGuerraPericiaValor, setOutrosGuerraPericiaValor), outrosValor: parseInt(outrosGuerraPericiaValor), },
        { treinoInput: TreinoPericia(treinoIniciativaPericiaValor, setTreinoIniciativaPericiaValor), treinado: treinoIniciativaPericiaValor, nome: "Iniciativa", total: iniciativaPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosIniciativaPericiaValor, setOutrosIniciativaPericiaValor), outrosValor: parseInt(outrosIniciativaPericiaValor), },
        { treinoInput: TreinoPericia(treinoIntimidacaoPericiaValor, setTreinoIntimidacaoPericiaValor), treinado: treinoIntimidacaoPericiaValor, nome: "Intimidação", total: intimidacaoPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosIntimidacaoPericiaValor, setOutrosIntimidacaoPericiaValor), outrosValor: parseInt(outrosIntimidacaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoIntuicaoPericiaValor, setTreinoIntuicaoPericiaValor), treinado: treinoIntuicaoPericiaValor, nome: "Intuição", total: intuicaoPericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosIntuicaoPericiaValor, setOutrosIntuicaoPericiaValor), outrosValor: parseInt(outrosIntuicaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoInvestigacaoPericiaValor, setTreinoInvestigacaoPericiaValor), treinado: treinoInvestigacaoPericiaValor, nome: "Investigação", total: investigacaoPericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosInvestigacaoPericiaValor, setOutrosInvestigacaoPericiaValor), outrosValor: parseInt(outrosInvestigacaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoJogatinaPericiaValor, setTreinoJogatinaPericiaValor), treinado: treinoJogatinaPericiaValor, nome: "Jogatina *", total: jogatinaPericia, nivelTotal: nivel, atributo: "CAR", modAtributo: carismaModificador, outrosInput: OutrosPericia(outrosJogatinaPericiaValor, setOutrosJogatinaPericiaValor), outrosValor: parseInt(outrosJogatinaPericiaValor), },
        { treinoInput: TreinoPericia(treinoLadinagemPericiaValor, setTreinoLadinagemPericiaValor), treinado: treinoLadinagemPericiaValor, nome: "Ladinagem *÷", total: ladinagemPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosLadinagemPericiaValor, setOutrosLadinagemPericiaValor), outrosValor: parseInt(outrosLadinagemPericiaValor), },
        { treinoInput: TreinoPericia(treinoLutaPericiaValor, setTreinoLutaPericiaValor), treinado: treinoLutaPericiaValor, nome: "Luta", total: lutaPericia, nivelTotal: nivel, atributo: "FOR", modAtributo: forcaModificador, outrosInput: OutrosPericia(outrosLutaPericiaValor, setOutrosLutaPericiaValor), outrosValor: parseInt(outrosLutaPericiaValor), },
        { treinoInput: TreinoPericia(treinoMisticismoPericiaValor, setTreinoMisticismoPericiaValor), treinado: treinoMisticismoPericiaValor, nome: "Misticismo *", total: misticismoPericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosMisticismoPericiaValor, setOutrosMisticismoPericiaValor), outrosValor: parseInt(outrosMisticismoPericiaValor), },
        { treinoInput: TreinoPericia(treinoNobrezaPericiaValor, setTreinoNobrezaPericiaValor), treinado: treinoNobrezaPericiaValor, nome: "Nobreza *", total: nobrezaPericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosNobrezaPericiaValor, setOutrosNobrezaPericiaValor), outrosValor: parseInt(outrosNobrezaPericiaValor), },
        { treinoInput: TreinoPericia(treinoOficio1PericiaValor, setTreinoOficio1PericiaValor), treinado: treinoOficio1PericiaValor, nome: "Ofício 1 *", total: oficio1Pericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosOficio1PericiaValor, setOutrosOficio1PericiaValor), outrosValor: parseInt(outrosOficio1PericiaValor), },
        { treinoInput: TreinoPericia(treinoOficio2PericiaValor, setTreinoOficio2PericiaValor), treinado: treinoOficio2PericiaValor, nome: "Ofício 2 *", total: oficio2Pericia, nivelTotal: nivel, atributo: "INT", modAtributo: inteligenciaModificador, outrosInput: OutrosPericia(outrosOficio2PericiaValor, setOutrosOficio2PericiaValor), outrosValor: parseInt(outrosOficio2PericiaValor), },
        { treinoInput: TreinoPericia(treinoPercepcaoPericiaValor, setTreinoPercepcaoPericiaValor), treinado: treinoPercepcaoPericiaValor, nome: "Percepção", total: percepcaoPericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosPercepcaoPericiaValor, setOutrosPercepcaoPericiaValor), outrosValor: parseInt(outrosPercepcaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoPilotagemPericiaValor, setTreinoPilotagemPericiaValor), treinado: treinoPilotagemPericiaValor, nome: "Pilotagem *", total: pilotagemPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosPilotagemPericiaValor, setOutrosPilotagemPericiaValor), outrosValor: parseInt(outrosPilotagemPericiaValor), },
        { treinoInput: TreinoPericia(treinoPontariaPericiaValor, setTreinoPontariaPericiaValor), treinado: treinoPontariaPericiaValor, nome: "Pontaria", total: pontariaPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosPontariaPericiaValor, setOutrosPontariaPericiaValor), outrosValor: parseInt(outrosPontariaPericiaValor), },
        { treinoInput: TreinoPericia(treinoReflexosPericiaValor, setTreinoReflexosPericiaValor), treinado: treinoReflexosPericiaValor, nome: "Reflexos", total: reflexosPericia, nivelTotal: nivel, atributo: "DES", modAtributo: destrezaModificador, outrosInput: OutrosPericia(outrosReflexosPericiaValor, setOutrosReflexosPericiaValor), outrosValor: parseInt(outrosReflexosPericiaValor), },
        { treinoInput: TreinoPericia(treinoReligiaoPericiaValor, setTreinoReligiaoPericiaValor), treinado: treinoReligiaoPericiaValor, nome: "Religião *", total: religiaoPericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosReligiaoPericiaValor, setOutrosReligiaoPericiaValor), outrosValor: parseInt(outrosReligiaoPericiaValor), },
        { treinoInput: TreinoPericia(treinoSobrevivenciaPericiaValor, setTreinoSobrevivenciaPericiaValor), treinado: treinoSobrevivenciaPericiaValor, nome: "Sobrevivência", total: sobrevivenciaPericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosSobrevivenciaPericiaValor, setOutrosSobrevivenciaPericiaValor), outrosValor: parseInt(outrosSobrevivenciaPericiaValor), },
        { treinoInput: TreinoPericia(treinoVontadePericiaValor, setTreinoVontadePericiaValor), treinado: treinoVontadePericiaValor, nome: "Vontade", total: vontadePericia, nivelTotal: nivel, atributo: "SAB", modAtributo: sabedoriaModificador, outrosInput: OutrosPericia(outrosVontadePericiaValor, setOutrosVontadePericiaValor), outrosValor: parseInt(outrosVontadePericiaValor), },
    ]

    var sheet = "";

    let navigate = useNavigate();

    const url = window.location.href;
    const sheetId = url.split("/").pop();

    sheetId === "novaficha" ? sheet = "novaficha" : sheet = "editarficha";

    function AddSheet() {
        if (personagem.length === 0 || jogador.length === 0 || campanha.length === 0) {
            setMessage("Preencha pelo menos os campos 'Personagem', 'Jogador' e 'Campanha'!");
        } else {
            addDoc(collection(db, "fichas"), {
                userId: userId,
                personagem: personagem,
                jogador: jogador,
                campanha: campanha,
                raca: raca,
                origem: origem,
                classe: classe,
                nivel: nivel,
                divindade: divindade,
                forcaAtributo: forcaAtributo,
                destrezaAtributo: destrezaAtributo,
                constituicaoAtributo: constituicaoAtributo,
                inteligenciaAtributo: inteligenciaAtributo,
                sabedoriaAtributo: sabedoriaAtributo,
                carismaAtributo: carismaAtributo,
                pvMaximo: pvMaximo,
                pvAtual: pvAtual,
                pmMaximo: pmMaximo,
                pmAtual: pmAtual,
                arrayAtaques: arrayAtaques,
                resistenciaMagiaMod: resistenciaMagiaMod,
                arrayMagias: arrayMagias,
                defesaMod: defesaMod,
                defesaOutros: defesaOutros,
                armaduraNome: armaduraNome,
                armaduraDefesa: armaduraDefesa,
                armaduraPenalidade: armaduraPenalidade,
                escudoNome: escudoNome,
                escudoDefesa: escudoDefesa,
                escudoPenalidade: escudoPenalidade,
                arrayItens: arrayItens,
                dinheiroValor: dinheiroValor,
                itemPeso: itemPeso,
                treinoAcrobaciaPericiaValor: treinoAcrobaciaPericiaValor,
                treinoAdestramentoPericiaValor: treinoAdestramentoPericiaValor,
                treinoAtletismoPericiaValor: treinoAtletismoPericiaValor,
                treinoAtuacaoPericiaValor: treinoAtuacaoPericiaValor,
                treinoCavalgarPericiaValor: treinoCavalgarPericiaValor,
                treinoConhecimentoPericiaValor: treinoConhecimentoPericiaValor,
                treinoCuraPericiaValor: treinoCuraPericiaValor,
                treinoDiplomaciaPericiaValor: treinoDiplomaciaPericiaValor,
                treinoEnganacaoPericiaValor: treinoEnganacaoPericiaValor,
                treinoFortitudePericiaValor: treinoFortitudePericiaValor,
                treinoFurtividadePericiaValor: treinoFurtividadePericiaValor,
                treinoGuerraPericiaValor: treinoGuerraPericiaValor,
                treinoIniciativaPericiaValor: treinoIniciativaPericiaValor,
                treinoIntimidacaoPericiaValor: treinoIntimidacaoPericiaValor,
                treinoIntuicaoPericiaValor: treinoIntuicaoPericiaValor,
                treinoInvestigacaoPericiaValor: treinoInvestigacaoPericiaValor,
                treinoJogatinaPericiaValor: treinoJogatinaPericiaValor,
                treinoLadinagemPericiaValor: treinoLadinagemPericiaValor,
                treinoLutaPericiaValor: treinoLutaPericiaValor,
                treinoMisticismoPericiaValor: treinoMisticismoPericiaValor,
                treinoNobrezaPericiaValor: treinoNobrezaPericiaValor,
                treinoOficio1PericiaValor: treinoOficio1PericiaValor,
                treinoOficio2PericiaValor: treinoOficio2PericiaValor,
                treinoPercepcaoPericiaValor: treinoPercepcaoPericiaValor,
                treinoPilotagemPericiaValor: treinoPilotagemPericiaValor,
                treinoPontariaPericiaValor: treinoPontariaPericiaValor,
                treinoReflexosPericiaValor: treinoReflexosPericiaValor,
                treinoReligiaoPericiaValor: treinoReligiaoPericiaValor,
                treinoSobrevivenciaPericiaValor: treinoSobrevivenciaPericiaValor,
                treinoVontadePericiaValor: treinoVontadePericiaValor,
                outrosAcrobaciaPericiaValor: outrosAcrobaciaPericiaValor,
                outrosAdestramentoPericiaValor: outrosAdestramentoPericiaValor,
                outrosAtletismoPericiaValor: outrosAtletismoPericiaValor,
                outrosAtuacaoPericiaValor: outrosAtuacaoPericiaValor,
                outrosCavalgarPericiaValor: outrosCavalgarPericiaValor,
                outrosConhecimentoPericiaValor: outrosConhecimentoPericiaValor,
                outrosCuraPericiaValor: outrosCuraPericiaValor,
                outrosDiplomaciaPericiaValor: outrosDiplomaciaPericiaValor,
                outrosEnganacaoPericiaValor: outrosEnganacaoPericiaValor,
                outrosFortitudePericiaValor: outrosFortitudePericiaValor,
                outrosFurtividadePericiaValor: outrosFurtividadePericiaValor,
                outrosGuerraPericiaValor: outrosGuerraPericiaValor,
                outrosIniciativaPericiaValor: outrosIniciativaPericiaValor,
                outrosIntimidacaoPericiaValor: outrosIntimidacaoPericiaValor,
                outrosIntuicaoPericiaValor: outrosIntuicaoPericiaValor,
                outrosInvestigacaoPericiaValor: outrosInvestigacaoPericiaValor,
                outrosJogatinaPericiaValor: outrosJogatinaPericiaValor,
                outrosLadinagemPericiaValor: outrosLadinagemPericiaValor,
                outrosLutaPericiaValor: outrosLutaPericiaValor,
                outrosMisticismoPericiaValor: outrosMisticismoPericiaValor,
                outrosNobrezaPericiaValor: outrosNobrezaPericiaValor,
                outrosOficio1PericiaValor: outrosOficio1PericiaValor,
                outrosOficio2PericiaValor: outrosOficio2PericiaValor,
                outrosPercepcaoPericiaValor: outrosPercepcaoPericiaValor,
                outrosPilotagemPericiaValor: outrosPilotagemPericiaValor,
                outrosPontariaPericiaValor: outrosPontariaPericiaValor,
                outrosReflexosPericiaValor: outrosReflexosPericiaValor,
                outrosReligiaoPericiaValor: outrosReligiaoPericiaValor,
                outrosSobrevivenciaPericiaValor: outrosSobrevivenciaPericiaValor,
                outrosVontadePericiaValor: outrosVontadePericiaValor,
                arrayHabilidadesRaca: arrayHabilidadesRaca,
                arrayHabilidadesOrigem: arrayHabilidadesOrigem,
                arrayHabilidadesClasse: arrayHabilidadesClasse,
                arrayPoderes: arrayPoderes,
                sobreProficiencia: sobreProficiencia,
                sobreHistoria: sobreHistoria,
                anotacoes: anotacoes
            }).then(() => {
                setMessage("");
                navigate("/trpg/home");
            }).catch((erro) => {
                setMessage(erro);
            });
        }
    }

    function SaveSheet() {
        if (personagem.length === 0 || jogador.length === 0 || campanha.length === 0) {
            setMessage("Preencha pelo menos os campos 'Personagem', 'Jogador' e 'Campanha'!");
        } else {
            updateDoc(doc(db, "fichas", sheetId), {
                personagem: personagem,
                jogador: jogador,
                campanha: campanha,
                raca: raca,
                origem: origem,
                classe: classe,
                nivel: nivel,
                divindade: divindade,
                forcaAtributo: forcaAtributo,
                destrezaAtributo: destrezaAtributo,
                constituicaoAtributo: constituicaoAtributo,
                inteligenciaAtributo: inteligenciaAtributo,
                sabedoriaAtributo: sabedoriaAtributo,
                carismaAtributo: carismaAtributo,
                pvMaximo: pvMaximo,
                pvAtual: pvAtual,
                pmMaximo: pmMaximo,
                pmAtual: pmAtual,
                arrayAtaques: arrayAtaques,
                resistenciaMagiaMod: resistenciaMagiaMod,
                arrayMagias: arrayMagias,
                defesaMod: defesaMod,
                defesaOutros: defesaOutros,
                armaduraNome: armaduraNome,
                armaduraDefesa: armaduraDefesa,
                armaduraPenalidade: armaduraPenalidade,
                escudoNome: escudoNome,
                escudoDefesa: escudoDefesa,
                escudoPenalidade: escudoPenalidade,
                dinheiroValor: dinheiroValor,
                arrayItens: arrayItens,
                treinoAcrobaciaPericiaValor: treinoAcrobaciaPericiaValor,
                treinoAdestramentoPericiaValor: treinoAdestramentoPericiaValor,
                treinoAtletismoPericiaValor: treinoAtletismoPericiaValor,
                treinoAtuacaoPericiaValor: treinoAtuacaoPericiaValor,
                treinoCavalgarPericiaValor: treinoCavalgarPericiaValor,
                treinoConhecimentoPericiaValor: treinoConhecimentoPericiaValor,
                treinoCuraPericiaValor: treinoCuraPericiaValor,
                treinoDiplomaciaPericiaValor: treinoDiplomaciaPericiaValor,
                treinoEnganacaoPericiaValor: treinoEnganacaoPericiaValor,
                treinoFortitudePericiaValor: treinoFortitudePericiaValor,
                treinoFurtividadePericiaValor: treinoFurtividadePericiaValor,
                treinoGuerraPericiaValor: treinoGuerraPericiaValor,
                treinoIniciativaPericiaValor: treinoIniciativaPericiaValor,
                treinoIntimidacaoPericiaValor: treinoIntimidacaoPericiaValor,
                treinoIntuicaoPericiaValor: treinoIntuicaoPericiaValor,
                treinoInvestigacaoPericiaValor: treinoInvestigacaoPericiaValor,
                treinoJogatinaPericiaValor: treinoJogatinaPericiaValor,
                treinoLadinagemPericiaValor: treinoLadinagemPericiaValor,
                treinoLutaPericiaValor: treinoLutaPericiaValor,
                treinoMisticismoPericiaValor: treinoMisticismoPericiaValor,
                treinoNobrezaPericiaValor: treinoNobrezaPericiaValor,
                treinoOficio1PericiaValor: treinoOficio1PericiaValor,
                treinoOficio2PericiaValor: treinoOficio2PericiaValor,
                treinoPercepcaoPericiaValor: treinoPercepcaoPericiaValor,
                treinoPilotagemPericiaValor: treinoPilotagemPericiaValor,
                treinoPontariaPericiaValor: treinoPontariaPericiaValor,
                treinoReflexosPericiaValor: treinoReflexosPericiaValor,
                treinoReligiaoPericiaValor: treinoReligiaoPericiaValor,
                treinoSobrevivenciaPericiaValor: treinoSobrevivenciaPericiaValor,
                treinoVontadePericiaValor: treinoVontadePericiaValor,
                outrosAcrobaciaPericiaValor: outrosAcrobaciaPericiaValor,
                outrosAdestramentoPericiaValor: outrosAdestramentoPericiaValor,
                outrosAtletismoPericiaValor: outrosAtletismoPericiaValor,
                outrosAtuacaoPericiaValor: outrosAtuacaoPericiaValor,
                outrosCavalgarPericiaValor: outrosCavalgarPericiaValor,
                outrosConhecimentoPericiaValor: outrosConhecimentoPericiaValor,
                outrosCuraPericiaValor: outrosCuraPericiaValor,
                outrosDiplomaciaPericiaValor: outrosDiplomaciaPericiaValor,
                outrosEnganacaoPericiaValor: outrosEnganacaoPericiaValor,
                outrosFortitudePericiaValor: outrosFortitudePericiaValor,
                outrosFurtividadePericiaValor: outrosFurtividadePericiaValor,
                outrosGuerraPericiaValor: outrosGuerraPericiaValor,
                outrosIniciativaPericiaValor: outrosIniciativaPericiaValor,
                outrosIntimidacaoPericiaValor: outrosIntimidacaoPericiaValor,
                outrosIntuicaoPericiaValor: outrosIntuicaoPericiaValor,
                outrosInvestigacaoPericiaValor: outrosInvestigacaoPericiaValor,
                outrosJogatinaPericiaValor: outrosJogatinaPericiaValor,
                outrosLadinagemPericiaValor: outrosLadinagemPericiaValor,
                outrosLutaPericiaValor: outrosLutaPericiaValor,
                outrosMisticismoPericiaValor: outrosMisticismoPericiaValor,
                outrosNobrezaPericiaValor: outrosNobrezaPericiaValor,
                outrosOficio1PericiaValor: outrosOficio1PericiaValor,
                outrosOficio2PericiaValor: outrosOficio2PericiaValor,
                outrosPercepcaoPericiaValor: outrosPercepcaoPericiaValor,
                outrosPilotagemPericiaValor: outrosPilotagemPericiaValor,
                outrosPontariaPericiaValor: outrosPontariaPericiaValor,
                outrosReflexosPericiaValor: outrosReflexosPericiaValor,
                outrosReligiaoPericiaValor: outrosReligiaoPericiaValor,
                outrosSobrevivenciaPericiaValor: outrosSobrevivenciaPericiaValor,
                outrosVontadePericiaValor: outrosVontadePericiaValor,
                arrayHabilidadesRaca: arrayHabilidadesRaca,
                arrayHabilidadesOrigem: arrayHabilidadesOrigem,
                arrayHabilidadesClasse: arrayHabilidadesClasse,
                arrayPoderes: arrayPoderes,
                sobreProficiencia: sobreProficiencia,
                sobreHistoria: sobreHistoria,
                anotacoes: anotacoes
            }).then(() => {
                setMessage("");
                navigate("/trpg/home");
            }).catch((erro) => {
                setMessage(erro);
            });
        }
    }

    function RollAnimate(setAnimation) {
        setAnimation(true);

        rolarTrigger
            ? setRolarTrigger(false)
            : setRolarTrigger(true)

        setTimeout(() => { setAnimation(false) }, 2000);
    }

    function LabelMod(mod) {
        return <label>{mod}</label>
    }

    function AtrModField(title, mod, atr, setatr) {
        return <div className="col-2 col-atributos">
            <label className="lbl-titulo2">{title}</label>
            <br />
            {LabelMod(mod)}
            <input value={atr} onChange={e => { setatr(e.target.value) }} type="number" className="form-control mx-auto" placeholder="" />
        </div>
    }

    function SetMod(setmod, atr) {
        setmod(Math.round(((atr - 10) / 2) - 0.01));
    }

    function TreinoPericia(treino, setTreino) {
        return <label className="ckbox-pericias">
            <input value={treino} onChange={e => { setTreino(e.target.checked) }} type="checkbox" checked={treino} />
            <span className="checkmark"></span>
        </label>
    }

    function OutrosPericia(outros, setOutros,) {
        return <input value={outros} onChange={e => { setOutros(e.target.value) }} type="number" className="form-control form-pericias-outros" placeholder="" />
    }

    function ToggleCollapse(collapse, setCollapse) {
        collapse
            ? setCollapse(false)
            : setCollapse(true)
    }

    useEffect(() => {

        if (sheet === "editarficha" && !docDone) {
            getDoc(doc(db, "fichas", sheetId)).then((r) => {
                setPersonagem(r.data().personagem);
                setJogador(r.data().jogador);
                setCampanha(r.data().campanha);
                setRaca(r.data().raca);
                setOrigem(r.data().origem);
                setClasse(r.data().classe);
                setNivel(r.data().nivel);
                setDivindade(r.data().divindade);
                setForcaAtributo(r.data().forcaAtributo);
                setDestrezaAtributo(r.data().destrezaAtributo);
                setConstituicaoAtributo(r.data().constituicaoAtributo);
                setInteligenciaAtributo(r.data().inteligenciaAtributo);
                setSabedoriaAtributo(r.data().sabedoriaAtributo);
                setCarismaAtributo(r.data().carismaAtributo);
                setPvMaximo(r.data().pvMaximo);
                setPvAtual(r.data().pvAtual);
                setPmMaximo(r.data().pmMaximo);
                setPmAtual(r.data().pmAtual);
                setArrayAtaques(r.data().arrayAtaques);
                setArrayMagias(r.data().arrayMagias);
                setResistenciaMagiaMod(r.data().resistenciaMagiaMod);
                setDefesaMod(r.data().defesaMod);
                setDefesaOutros(r.data().defesaOutros);
                setArmaduraNome(r.data().armaduraNome);
                setArmaduraDefesa(r.data().armaduraDefesa);
                setArmaduraPenalidade(r.data().armaduraPenalidade);
                setEscudoNome(r.data().escudoNome);
                setEscudoDefesa(r.data().escudoDefesa);
                setEscudoPenalidade(r.data().escudoPenalidade);
                setDinheiroValor(r.data().dinheiroValor);
                setArrayItens(r.data().arrayItens);
                setTreinoAcrobaciaPericiaValor(r.data().treinoAcrobaciaPericiaValor);
                setTreinoAdestramentoPericiaValor(r.data().treinoAdestramentoPericiaValor);
                setTreinoAtletismoPericiaValor(r.data().treinoAtletismoPericiaValor);
                setTreinoAtuacaoPericiaValor(r.data().treinoAtuacaoPericiaValor);
                setTreinoCavalgarPericiaValor(r.data().treinoCavalgarPericiaValor);
                setTreinoConhecimentoPericiaValor(r.data().treinoConhecimentoPericiaValor);
                setTreinoCuraPericiaValor(r.data().treinoCuraPericiaValor);
                setTreinoDiplomaciaPericiaValor(r.data().treinoDiplomaciaPericiaValor);
                setTreinoEnganacaoPericiaValor(r.data().treinoEnganacaoPericiaValor);
                setTreinoFortitudePericiaValor(r.data().treinoFortitudePericiaValor);
                setTreinoFurtividadePericiaValor(r.data().treinoFurtividadePericiaValor);
                setTreinoGuerraPericiaValor(r.data().treinoGuerraPericiaValor);
                setTreinoIniciativaPericiaValor(r.data().treinoIniciativaPericiaValor);
                setTreinoIntimidacaoPericiaValor(r.data().treinoIntimidacaoPericiaValor);
                setTreinoIntuicaoPericiaValor(r.data().treinoIntuicaoPericiaValor);
                setTreinoInvestigacaoPericiaValor(r.data().treinoInvestigacaoPericiaValor);
                setTreinoJogatinaPericiaValor(r.data().treinoJogatinaPericiaValor);
                setTreinoLadinagemPericiaValor(r.data().treinoLadinagemPericiaValor);
                setTreinoLutaPericiaValor(r.data().treinoLutaPericiaValor);
                setTreinoMisticismoPericiaValor(r.data().treinoMisticismoPericiaValor);
                setTreinoNobrezaPericiaValor(r.data().treinoNobrezaPericiaValor);
                setTreinoOficio1PericiaValor(r.data().treinoOficio1PericiaValor);
                setTreinoOficio2PericiaValor(r.data().treinoOficio2PericiaValor);
                setTreinoPercepcaoPericiaValor(r.data().treinoPercepcaoPericiaValor);
                setTreinoPilotagemPericiaValor(r.data().treinoPilotagemPericiaValor);
                setTreinoPontariaPericiaValor(r.data().treinoPontariaPericiaValor);
                setTreinoReflexosPericiaValor(r.data().treinoReflexosPericiaValor);
                setTreinoReligiaoPericiaValor(r.data().treinoReligiaoPericiaValor);
                setTreinoSobrevivenciaPericiaValor(r.data().treinoSobrevivenciaPericiaValor);
                setTreinoVontadePericiaValor(r.data().treinoVontadePericiaValor);
                setOutrosAcrobaciaPericiaValor(r.data().outrosAcrobaciaPericiaValor);
                setOutrosAdestramentoPericiaValor(r.data().outrosAdestramentoPericiaValor);
                setOutrosAtletismoPericiaValor(r.data().outrosAtletismoPericiaValor);
                setOutrosAtuacaoPericiaValor(r.data().outrosAtuacaoPericiaValor);
                setOutrosCavalgarPericiaValor(r.data().outrosCavalgarPericiaValor);
                setOutrosConhecimentoPericiaValor(r.data().outrosConhecimentoPericiaValor);
                setOutrosCuraPericiaValor(r.data().outrosCuraPericiaValor);
                setOutrosDiplomaciaPericiaValor(r.data().outrosDiplomaciaPericiaValor);
                setOutrosEnganacaoPericiaValor(r.data().outrosEnganacaoPericiaValor);
                setOutrosFortitudePericiaValor(r.data().outrosFortitudePericiaValor);
                setOutrosFurtividadePericiaValor(r.data().outrosFurtividadePericiaValor);
                setOutrosGuerraPericiaValor(r.data().outrosGuerraPericiaValor);
                setOutrosIniciativaPericiaValor(r.data().outrosIniciativaPericiaValor);
                setOutrosIntimidacaoPericiaValor(r.data().outrosIntimidacaoPericiaValor);
                setOutrosIntuicaoPericiaValor(r.data().outrosIntuicaoPericiaValor);
                setOutrosInvestigacaoPericiaValor(r.data().outrosInvestigacaoPericiaValor);
                setOutrosJogatinaPericiaValor(r.data().outrosJogatinaPericiaValor);
                setOutrosLadinagemPericiaValor(r.data().outrosLadinagemPericiaValor);
                setOutrosLutaPericiaValor(r.data().outrosLutaPericiaValor);
                setOutrosMisticismoPericiaValor(r.data().outrosMisticismoPericiaValor);
                setOutrosNobrezaPericiaValor(r.data().outrosNobrezaPericiaValor);
                setOutrosOficio1PericiaValor(r.data().outrosOficio1PericiaValor);
                setOutrosOficio2PericiaValor(r.data().outrosOficio2PericiaValor);
                setOutrosPercepcaoPericiaValor(r.data().outrosPercepcaoPericiaValor);
                setOutrosPilotagemPericiaValor(r.data().outrosPilotagemPericiaValor);
                setOutrosPontariaPericiaValor(r.data().outrosPontariaPericiaValor);
                setOutrosReflexosPericiaValor(r.data().outrosReflexosPericiaValor);
                setOutrosReligiaoPericiaValor(r.data().outrosReligiaoPericiaValor);
                setOutrosSobrevivenciaPericiaValor(r.data().outrosSobrevivenciaPericiaValor);
                setOutrosVontadePericiaValor(r.data().outrosVontadePericiaValor);
                setArrayHabilidadesRaca(r.data().arrayHabilidadesRaca);
                setArrayHabilidadesOrigem(r.data().arrayHabilidadesOrigem);
                setArrayHabilidadesClasse(r.data().arrayHabilidadesClasse);
                setArrayPoderes(r.data().arrayPoderes);
                setSobreProficiencia(r.data().sobreProficiencia);
                setSobreHistoria(r.data().sobreHistoria);
                setAnotacoes(r.data().anotacoes);

                setDocDone(true);
            })
        }

        SetMod(setForcaModificador, forcaAtributo);
        SetMod(setDestrezaModificador, destrezaAtributo);
        SetMod(setConstituicaoModificador, constituicaoAtributo);
        SetMod(setInteligenciaModificador, inteligenciaAtributo);
        SetMod(setSabedoriaModificador, sabedoriaAtributo);
        SetMod(setCarismaModificador, carismaAtributo);

        setDefesaValor(10 + destrezaModificador + armaduraDefesa + escudoDefesa + defesaOutros);

    }, [forcaAtributo, destrezaAtributo, constituicaoAtributo, inteligenciaAtributo, sabedoriaAtributo, carismaAtributo, armaduraDefesa, escudoDefesa, defesaOutros]);

    return <section className="section-default" id="section-new-sheet">
        <Navbar />
        <div className="container-fluid div-new-sheet">

            {/* Row 1 */}
            <div className="row text-center justify-items-center">
                {
                    sheet === "novaficha"
                        ? <h1>Criar uma ficha</h1>
                        : <h1>Editar uma ficha</h1>
                }
            </div>

            {/* Row 2 */}
            <div className="row text-center justify-items-center">
                <div className="col-4 py-2">
                    <Link to={"/trpg/home"} className="w-100 btn btn-danger">Cancelar</Link>
                </div>
                <div className="col-4 py-2">
                    <button onClick={() => {
                        setRolarDadosPopup(true);
                        setDados(1);
                        setFaces(1);
                        setModificadorSomar(0);
                        setModificadorSubtrair(0);
                        setTimeout(() => RollAnimate(setRollAnimation), 1);
                    }} className="w-100 btn btn-primary">Rolar dados</button>
                </div>
                <div className="col-4 py-2">
                    <button onClick={
                        sheet === "novaficha"
                            ? AddSheet
                            : SaveSheet
                    } className="w-100 btn btn-success">
                        {
                            sheet === "novaficha"
                                ? "Concluido"
                                : "Salvar alterações"
                        }
                    </button>
                </div>

                <RollDicePopup
                    trigger={rolarDadosPopup} setTrigger={setRolarDadosPopup}
                    rollAnimation={rollAnimation} setRollAnimation={setRollAnimation}
                    rolarTrigger={rolarTrigger} setRolarTrigger={setRolarTrigger}
                    dados={dados} setDados={setDados}
                    faces={faces} setFaces={setFaces}
                    modificadorSomar={modificadorSomar} setModificadorSomar={setModificadorSomar}
                    modificadorSubtrair={modificadorSubtrair} setModificadorSubtrair={setModificadorSubtrair}
                />
            </div>

            {/* Row 3 */}
            <div className="row text-center justify-items-center">
                {
                    message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                }
            </div>

            {/* Row 4 */}
            <div className="row text-center justify-items-center">
                <div className="col-5">
                    <div className="form-floating">
                        <input value={personagem} onChange={e => setPersonagem(e.target.value)} type="text" className="form-control" placeholder="Nome do personagem" />
                        <label htmlFor="floatingInput" className="floating-label">Personagem</label>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-floating">
                        <input value={jogador} onChange={e => setJogador(e.target.value)} type="text" className="form-control" placeholder="Nome do jogador" />
                        <label htmlFor="floatingInput" className="floating-label">Jogador</label>
                    </div>
                </div>
                <div className="col-3 col-form-campanha">
                    <div className="form-floating">
                        <input value={campanha} onChange={e => setCampanha(e.target.value)} type="text" className="form-control" placeholder="Campanha" />
                        <label htmlFor="floatingInput" className="floating-label">Campanha</label>
                    </div>
                </div>
            </div>

            {/* Row 5 */}
            <div className="row text-center justify-items-center">
                <div className="col-2">
                    <div className="form-floating">
                        <input value={raca} onChange={e => setRaca(e.target.value)} type="text" className="form-control" placeholder="Raça" />
                        <label htmlFor="floatingInput" className="floating-label">Raça</label>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-floating">
                        <input value={origem} onChange={e => setOrigem(e.target.value)} type="text" className="form-control" placeholder="Origem" />
                        <label htmlFor="floatingInput" className="floating-label">Origem</label>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-floating">
                        <input value={classe} onChange={e => setClasse(e.target.value)} type="text" className="form-control" placeholder="Classe" />
                        <label htmlFor="floatingInput" className="floating-label">Classe</label>
                    </div>
                </div>
                <div className="col-1">
                    <div className="form-floating">
                        <input value={nivel} onChange={e => setNivel(e.target.value)} type="number" className="form-control" placeholder="Nível" />
                        <label htmlFor="floatingInput" className="floating-label">Nível</label>
                    </div>
                </div>
                <div className="col-3 col-form-divindade">
                    <div className="form-floating">
                        <input value={divindade} onChange={e => setDivindade(e.target.value)} type="text" className="form-control" placeholder="Divindade" />
                        <label htmlFor="floatingInput" className="floating-label">Divindade</label>
                    </div>
                </div>
            </div>

            {/* Row 6 */}
            <div className="row">
                {/* Col Left */}
                <div className="col-lg">

                    {/* Col left - Row 1 - Atributos */}
                    <div className="row row-atr-mod mb-3">
                        {AtrModField("FOR", forcaModificador, forcaAtributo, setForcaAtributo)}
                        {AtrModField("DES", destrezaModificador, destrezaAtributo, setDestrezaAtributo)}
                        {AtrModField("CON", constituicaoModificador, constituicaoAtributo, setConstituicaoAtributo)}
                        {AtrModField("INT", inteligenciaModificador, inteligenciaAtributo, setInteligenciaAtributo)}
                        {AtrModField("SAB", sabedoriaModificador, sabedoriaAtributo, setSabedoriaAtributo)}
                        {AtrModField("CAR", carismaModificador, carismaAtributo, setCarismaAtributo)}
                    </div>

                    {/* Col left - Row 2 - PV / PM */}
                    <div className="div-grupo" style=
                        {
                            pontosCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(pontosCollapse, setPontosCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        pontosCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-5 d-flex text-start align-middle">
                                <label className="lbl-titulo">Pontos</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={pontosCollapse}>
                            <label className="lbl-titulo">Pontos de Vida</label>
                            <div className="row row-pontos">
                                <div className="col-6">
                                    <label>Máximos</label>
                                    <input value={pvMaximo} onChange={e => { setPvMaximo(parseInt(e.target.value)) }} type="number" className="form-control form-pontos form-control-div-grupo" placeholder="" />
                                </div>
                                <div className="col-6">
                                    <label>Atuais</label>
                                    <input value={pvAtual} onChange={e => { setPvAtual(parseInt(e.target.value)) }} type="number" className="form-control form-pontos form-control-div-grupo" placeholder="" />
                                </div>
                            </div>

                            <label className="lbl-titulo">Pontos de Mana</label>
                            <div className="row row-pontos mb-3">
                                <div className="col-6">
                                    <label>Máximos</label>
                                    <input value={pmMaximo} onChange={e => { setPmMaximo(parseInt(e.target.value)) }} type="number" className="form-control form-pontos form-control-div-grupo mx-auto" placeholder="" />
                                </div>
                                <div className="col-6">
                                    <label>Atuais</label>
                                    <input value={pmAtual} onChange={e => { setPmAtual(parseInt(e.target.value)) }} type="number" className="form-control form-pontos form-control-div-grupo mx-auto" placeholder="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 3 - Ataques */}
                    <div className="div-grupo" style=
                        {
                            ataqueCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div className="row row-grupo-collapse mb-1">
                            <div onClick={() => ToggleCollapse(ataqueCollapse, setAtaqueCollapse)} className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        ataqueCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div onClick={() => ToggleCollapse(ataqueCollapse, setAtaqueCollapse)} className="col-3 d-flex text-start">
                                <label className="lbl-titulo">Ataques</label>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button onClick={() => setAtaquePopup(true)} className="btn btn-success btn-adicionar-item" hidden={ataqueCollapse}>Adicionar</button>
                            </div>
                        </div>
                        <div className="row-valores" hidden={ataqueCollapse}>
                            <div className="row">

                                <AttackList
                                    trigger={ataquePopup} setTrigger={setAtaquePopup}
                                    ataqueNome={ataqueNome} setAtaqueNome={setAtaqueNome}
                                    ataqueTeste={ataqueTeste} setAtaqueTeste={setAtaqueTeste}
                                    ataqueDano={ataqueDano} setAtaqueDano={setAtaqueDano}
                                    ataqueCritico={ataqueCritico} setAtaqueCritico={setAtaqueCritico}
                                    ataqueTipo={ataqueTipo} setAtaqueTipo={setAtaqueTipo}
                                    ataqueAlcance={ataqueAlcance} setAtaqueAlcance={setAtaqueAlcance}
                                    ataqueDescricao={ataqueDescricao} setAtaqueDescricao={setAtaqueDescricao}
                                    ataqueEditId={ataqueEditId} setAtaqueEditId={setAtaqueEditId}
                                    arrayAtaques={arrayAtaques}
                                />

                                <AttackPopup
                                    trigger={ataquePopup} setTrigger={setAtaquePopup}
                                    ataqueNome={ataqueNome} setAtaqueNome={setAtaqueNome}
                                    ataqueTeste={ataqueTeste} setAtaqueTeste={setAtaqueTeste}
                                    ataqueDano={ataqueDano} setAtaqueDano={setAtaqueDano}
                                    ataqueCritico={ataqueCritico} setAtaqueCritico={setAtaqueCritico}
                                    ataqueTipo={ataqueTipo} setAtaqueTipo={setAtaqueTipo}
                                    ataqueAlcance={ataqueAlcance} setAtaqueAlcance={setAtaqueAlcance}
                                    ataqueDescricao={ataqueDescricao} setAtaqueDescricao={setAtaqueDescricao}
                                    ataqueEditId={ataqueEditId} setAtaqueEditId={setAtaqueEditId}
                                    arrayAtaques={arrayAtaques}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 4 - Magias */}
                    <div className="div-grupo" style=
                        {
                            magiaCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div className="row row-grupo-collapse mb-1">
                            <div onClick={() => ToggleCollapse(magiaCollapse, setMagiaCollapse)} className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        magiaCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div onClick={() => ToggleCollapse(magiaCollapse, setMagiaCollapse)} className="col-3 d-flex text-start">
                                <label className="lbl-titulo">Magias</label>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button onClick={() => setMagiaPopup(true)} className="btn btn-success btn-adicionar-item" hidden={magiaCollapse}>Adicionar</button>
                            </div>
                        </div>
                        {
                            arrayMagias.length === 0
                                ? null
                                : <div className="row row-magia row-resistencia-magia text-center" hidden={magiaCollapse}>
                                    <div className="row mx-auto">
                                        <label>Teste de Resistência:</label>
                                        <br />
                                        <label className="lbl-resistencia-magia-valor">
                                            {10 + Math.round((nivel / 2) - 0.01) + (
                                                resistenciaMagiaMod === "for"
                                                    ? forcaModificador
                                                    : resistenciaMagiaMod === "des"
                                                        ? destrezaModificador
                                                        : resistenciaMagiaMod === "con"
                                                            ? constituicaoModificador
                                                            : resistenciaMagiaMod === "int"
                                                                ? inteligenciaModificador
                                                                : resistenciaMagiaMod === "sab"
                                                                    ? sabedoriaModificador
                                                                    : resistenciaMagiaMod === "car"
                                                                        ? carismaModificador
                                                                        : alert("resistenciaMagiaMod inválido"))}
                                        </label>
                                    </div>

                                    <div className="row mx-auto">
                                        <div className="col-1 mx-auto">
                                            <label> = </label>
                                        </div>
                                        <div className="col-1 mx-auto">
                                            <label>10</label>
                                        </div>
                                        <div className="col-1 mx-auto">
                                            <label>+</label>
                                        </div>
                                        <div className="col-3 mx-auto">
                                            <label>1/2 do nível</label>
                                        </div>
                                        <div className="col-1 mx-auto">
                                            <label>+</label>
                                        </div>
                                        <div className="col-4 mx-auto">
                                            <label>Atributo-chave:</label>
                                            <br />
                                            {<AtrCombobox defaultValue={resistenciaMagiaMod} setValue={e => setResistenciaMagiaMod(e.target.value)} />}
                                            <label className="ms-3">
                                                {
                                                    resistenciaMagiaMod === "for"
                                                        ? forcaModificador
                                                        : resistenciaMagiaMod === "des"
                                                            ? destrezaModificador
                                                            : resistenciaMagiaMod === "con"
                                                                ? constituicaoModificador
                                                                : resistenciaMagiaMod === "int"
                                                                    ? inteligenciaModificador
                                                                    : resistenciaMagiaMod === "sab"
                                                                        ? sabedoriaModificador
                                                                        : resistenciaMagiaMod === "car"
                                                                            ? carismaModificador
                                                                            : alert("resistenciaMagiaMod inválido")
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </div>

                        }
                        <div className="row-valores" hidden={magiaCollapse}>
                            <div className="row">

                                <SpellsList
                                    trigger={magiaPopup} setTrigger={setMagiaPopup}
                                    magiaNome={magiaNome} setMagiaNome={setMagiaNome}
                                    magiaEscola={magiaEscola} setMagiaEscola={setMagiaEscola}
                                    magiaExecucao={magiaExecucao} setMagiaExecucao={setMagiaExecucao}
                                    magiaAlcance={magiaAlcance} setMagiaAlcance={setMagiaAlcance}
                                    magiaAlvo={magiaAlvo} setMagiaAlvo={setMagiaAlvo}
                                    magiaDuracao={magiaDuracao} setMagiaDuracao={setMagiaDuracao}
                                    magiaResistencia={magiaResistencia} setMagiaResistencia={setMagiaResistencia}
                                    magiaDescricao={magiaDescricao} setMagiaDescricao={setMagiaDescricao}
                                    magiaEditId={magiaEditId} setMagiaEditId={setMagiaEditId}
                                    arrayMagias={arrayMagias}
                                />

                                <SpellPopup
                                    trigger={magiaPopup} setTrigger={setMagiaPopup}
                                    magiaNome={magiaNome} setMagiaNome={setMagiaNome}
                                    magiaEscola={magiaEscola} setMagiaEscola={setMagiaEscola}
                                    magiaExecucao={magiaExecucao} setMagiaExecucao={setMagiaExecucao}
                                    magiaAlcance={magiaAlcance} setMagiaAlcance={setMagiaAlcance}
                                    magiaAlvo={magiaAlvo} setMagiaAlvo={setMagiaAlvo}
                                    magiaDuracao={magiaDuracao} setMagiaDuracao={setMagiaDuracao}
                                    magiaResistencia={magiaResistencia} setMagiaResistencia={setMagiaResistencia}
                                    magiaDescricao={magiaDescricao} setMagiaDescricao={setMagiaDescricao}
                                    magiaEditId={magiaEditId} setMagiaEditId={setMagiaEditId}
                                    arrayMagias={arrayMagias}
                                />

                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 5 - Defesa*/}
                    <div className="div-grupo" style=
                        {
                            defesaCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(defesaCollapse, setDefesaCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        defesaCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-3 d-flex text-start align-middle">
                                <label className="lbl-titulo">Defesa</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={defesaCollapse}>
                            <div className="row row-defesa mb-3">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-defesa mx-auto mb-2">
                                        <label className="lbl-defesa-desc">Defesa total</label>
                                        <label className="lbl-defesa-valor">{10 + (
                                            defesaMod === "for" ? forcaModificador :
                                                defesaMod === "des" ? destrezaModificador
                                                    : defesaMod === "con" ? constituicaoModificador
                                                        : defesaMod === "int" ? inteligenciaModificador
                                                            : defesaMod === "sab" ? sabedoriaModificador
                                                                : defesaMod === "car" ? carismaModificador
                                                                    : alert("defesaMod inválido")
                                        ) + armaduraDefesa + escudoDefesa + defesaOutros}</label>
                                    </div>

                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> = </label>
                                    </div>

                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> 10 </label>
                                    </div>

                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> + </label>
                                    </div>

                                    <div className="col-2 col-defesa">
                                        <label className="lbl-defesa-desc">Modificador</label>
                                        <br />
                                        <AtrCombobox defaultValue={defesaMod} setValue={e => setDefesaMod(e.target.value)} />
                                        <label className="lbl-defesa-valor">
                                            {
                                                defesaMod === "for"
                                                    ? forcaModificador
                                                    : defesaMod === "des"
                                                        ? destrezaModificador
                                                        : defesaMod === "con"
                                                            ? constituicaoModificador
                                                            : defesaMod === "int"
                                                                ? inteligenciaModificador
                                                                : defesaMod === "sab"
                                                                    ? sabedoriaModificador
                                                                    : defesaMod === "car"
                                                                        ? carismaModificador
                                                                        : alert("defesaMod inválido")
                                            }
                                        </label>
                                    </div>

                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> + </label>
                                    </div>

                                    <div className="col-2 col-defesa">
                                        <label className="lbl-defesa-desc">Bônus armadura</label>
                                        <label className="lbl-defesa-valor">{armaduraDefesa}</label>
                                    </div>
                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> + </label>
                                    </div>

                                    <div className="col-2 col-defesa">
                                        <label className="lbl-defesa-desc">Bônus escudo</label>
                                        <label className="lbl-defesa-valor">{escudoDefesa}</label>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="col-1 col-defesa">
                                        <br />
                                        <label> + </label>
                                    </div>

                                    <div className="col-2 col-defesa">
                                        <label className="lbl-defesa-desc">Outros</label>
                                        <input value={defesaOutros} onChange={e => { setDefesaOutros(parseInt(e.target.value)) }} type="number" className="form-control form-ataque form-control-div-grupo" placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Col left - Row 6 - Armardura e Escudo */}
                    <div className="div-grupo" style=
                        {
                            armEscCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(armEscCollapse, setArmEscCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        armEscCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-5 d-flex text-start align-middle">
                                <label className="lbl-titulo">Armadura e Escudo</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={armEscCollapse}>
                            <div className="row row-arm-esc mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <label className="lbl-armadura-nome">Armadura</label>
                                        <input value={armaduraNome} onChange={e => { setArmaduraNome(e.target.value) }} type="text" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                    <div className="col-3">
                                        <label className="lbl-armadura-defesa">Defesa</label>
                                        <input value={armaduraDefesa} onChange={e => { setArmaduraDefesa(parseInt(e.target.value)) }} type="number" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                    <div className="col-3">
                                        <label className="lbl-armadura-penalidade">Penalidade</label>
                                        <input value={armaduraPenalidade} onChange={e => { setArmaduraPenalidade(parseInt(e.target.value)) }} type="number" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label className="lbl-escudo-nome">Escudo</label>
                                        <input value={escudoNome} onChange={e => { setEscudoNome(e.target.value) }} type="text" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                    <div className="col-3">
                                        <label className="lbl-escudo-defesa">Defesa</label>
                                        <input value={escudoDefesa} onChange={e => { setEscudoDefesa(parseInt(e.target.value)) }} type="number" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                    <div className="col-3">
                                        <label className="lbl-escudo-penalidade">Penalidade</label>
                                        <input value={escudoPenalidade} onChange={e => { setEscudoPenalidade(parseInt(e.target.value)) }} type="number" className="form-control form-control-div-grupo" placeholder="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 7 - Inventário */}
                    <div className="div-grupo" style=
                        {
                            itemCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div className="row row-grupo-collapse mb-1">
                            <div onClick={() => ToggleCollapse(itemCollapse, setItemCollapse)} className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        itemCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div onClick={() => ToggleCollapse(itemCollapse, setItemCollapse)} className="col-3 d-flex text-start align-middle">
                                <label className="lbl-titulo">Inventário</label>
                            </div>
                            <div className="col-8 d-flex justify-content-end">
                                <button onClick={() => setItemPopup(true)} className="btn btn-success btn-adicionar-item" hidden={itemCollapse}>Adicionar</button>
                            </div>
                        </div>
                        <div className="row" hidden={itemCollapse}>
                            <div className="col-6">
                                <div onClick={() => setDinheiroPopup(true)} className="row row-dinheiro-total">
                                    <div className="col-6 text-end lbl-dinheiro-total">
                                        <label className="me-2">Dinheiro</label>
                                    </div>
                                    <div className="col-4 lbl-dinheiro-total">
                                        <label>{dinheiroValor}</label>
                                    </div>
                                </div>
                                <MoneyPopup
                                    trigger={dinheiroPopup} setTrigger={setDinheiroPopup}
                                    dinheiroValor={dinheiroValor} setDinheiroValor={setDinheiroValor}
                                />
                            </div>
                            {
                                arrayItens.length === 0
                                    ? null
                                    : <div className="col-6">
                                        <div className="row row-peso-total">
                                            <div className="col-6 text-end lbl-peso-total">
                                                <label className="me-2">Peso total</label>
                                            </div>
                                            <div className="col-4 lbl-peso-total">
                                                <label>
                                                    <ItemsTotalWeight
                                                        arrayItens={arrayItens}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="row-valores" hidden={itemCollapse}>
                            <div className="row">
                                <ItemsList
                                    trigger={itemPopup} setTrigger={setItemPopup}
                                    itemNome={itemNome} setItemNome={setItemNome}
                                    itemPeso={itemPeso} setItemPeso={setItemPeso}
                                    itemValor={itemValor} setItemValor={setItemValor}
                                    itemEditId={itemEditId} setItemEditId={setItemEditId}
                                    arrayItens={arrayItens} />

                                <ItemPopup
                                    trigger={itemPopup} setTrigger={setItemPopup}
                                    trigger={itemPopup} setTrigger={setItemPopup}
                                    itemNome={itemNome} setItemNome={setItemNome}
                                    itemPeso={itemPeso} setItemPeso={setItemPeso}
                                    itemValor={itemValor} setItemValor={setItemValor}
                                    itemEditId={itemEditId} setItemEditId={setItemEditId}
                                    arrayItens={arrayItens} />
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 8 - Habilidades e Poderes */}
                    <div className="div-grupo" style=
                        {
                            habilidadesCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(habilidadesCollapse, setHabilidadesCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        habilidadesCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-5 d-flex text-start align-middle">
                                <label className="lbl-titulo">Habilidades e Poderes</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={habilidadesCollapse}>

                            {/* Row 1 - Habilidades Raça */}
                            <div className="row row-grupo-collapse mb-1">
                                <div onClick={() => ToggleCollapse(habilidadeRacaCollapse, setHabilidadeRacaCollapse)} className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            habilidadeRacaCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div onClick={() => ToggleCollapse(habilidadeRacaCollapse, setHabilidadeRacaCollapse)} className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">Raça</label>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button onClick={() => setHabilidadesRacaPopup(true)} className="btn btn-success btn-adicionar-item" hidden={habilidadeRacaCollapse}>Adicionar</button>
                                </div>
                            </div>
                            <div className="row row-habilidade-raca" hidden={habilidadeRacaCollapse}>
                                <FeaturesList
                                    trigger={habilidadesRacaPopup} setTrigger={setHabilidadesRacaPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesRaca} />

                                <FeaturePopup
                                    trigger={habilidadesRacaPopup} setTrigger={setHabilidadesRacaPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesRaca} />
                            </div>

                            {/* Row 2 - Habilidades Origem */}
                            <div className="row row-grupo-collapse mb-1">
                                <div onClick={() => ToggleCollapse(habilidadeOrigemCollapse, setHabilidadeOrigemCollapse)} className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            habilidadeOrigemCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div onClick={() => ToggleCollapse(habilidadeOrigemCollapse, setHabilidadeOrigemCollapse)} className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">Origem</label>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button onClick={() => setHabilidadesOrigemPopup(true)} className="btn btn-success btn-adicionar-item" hidden={habilidadeOrigemCollapse}>Adicionar</button>
                                </div>
                            </div>
                            <div className="row row-habilidade-origem" hidden={habilidadeOrigemCollapse}>
                                <FeaturesList
                                    trigger={habilidadesOrigemPopup} setTrigger={setHabilidadesOrigemPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesOrigem} />

                                <FeaturePopup
                                    trigger={habilidadesOrigemPopup} setTrigger={setHabilidadesOrigemPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesOrigem} />
                            </div>

                            {/* Row 3 - Habilidades Classe */}
                            <div className="row row-grupo-collapse mb-1">
                                <div onClick={() => ToggleCollapse(habilidadeClasseCollapse, setHabilidadeClasseCollapse)} className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            habilidadeClasseCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div onClick={() => ToggleCollapse(habilidadeClasseCollapse, setHabilidadeClasseCollapse)} className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">Classe</label>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button onClick={() => setHabilidadesClassePopup(true)} className="btn btn-success btn-adicionar-item" hidden={habilidadeClasseCollapse}>Adicionar</button>
                                </div>
                            </div>
                            <div className="row row-habilidade-classe" hidden={habilidadeClasseCollapse}>
                                <FeaturesList
                                    trigger={habilidadesClassePopup} setTrigger={setHabilidadesClassePopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesClasse} />

                                <FeaturePopup
                                    trigger={habilidadesClassePopup} setTrigger={setHabilidadesClassePopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayHabilidadesClasse} />
                            </div>

                            {/* Row 4 - Poderes */}
                            <div className="row row-grupo-collapse mb-1">
                                <div onClick={() => ToggleCollapse(habilidadePoderesCollapse, setHabilidadePoderesCollapse)} className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            habilidadePoderesCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div onClick={() => ToggleCollapse(habilidadePoderesCollapse, setHabilidadePoderesCollapse)} className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">Poderes</label>
                                </div>
                                <div className="col-8 d-flex justify-content-end">
                                    <button onClick={() => setPoderesPopup(true)} className="btn btn-success btn-adicionar-item" hidden={habilidadePoderesCollapse}>Adicionar</button>
                                </div>
                            </div>
                            <div className="row row-habilidade-poderes" hidden={habilidadePoderesCollapse}>
                                <FeaturesList
                                    trigger={poderesPopup} setTrigger={setPoderesPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayPoderes} />

                                <FeaturePopup
                                    trigger={poderesPopup} setTrigger={setPoderesPopup}
                                    habilidadeNome={habilidadeNome} setHabilidadeNome={setHabilidadeNome}
                                    habilidadeDescricao={habilidadeDescricao} setHabilidadeDescricao={setHabilidadeDescricao}
                                    habilidadeEditId={habilidadeEditId} setHabilidadeEditId={setHabilidadeEditId}
                                    arrayHabilidades={arrayPoderes} />
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 9 - Sobre o Personagem */}
                    <div className="div-grupo" style=
                        {
                            sobreCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(sobreCollapse, setSobreCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        sobreCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-5 d-flex text-start align-middle">
                                <label className="lbl-titulo">Sobre o personagem</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={sobreCollapse}>

                            {/* Row 1 - Proficiências */}
                            <div onClick={() => ToggleCollapse(sobreProficienciaCollapse, setSobreProficienciaCollapse)} className="row row-grupo-collapse mb-1">
                                <div className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            sobreProficienciaCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">Proficiências</label>
                                </div>
                            </div>
                            <div className="row row-valores" hidden={sobreProficienciaCollapse}>
                                <textarea value={sobreProficiencia} onChange={e => { setSobreProficiencia(e.target.value) }} className="form-control form-control-div-grupo form-anotacoes" placeholder="" rows="auto" />
                            </div>

                            {/* Row 2 - História */}
                            <div onClick={() => ToggleCollapse(sobreHistoriaCollapse, setSobreHistoriaCollapse)} className="row row-grupo-collapse mb-1">
                                <div className="col-1 col-img-collapse text-end p-0">
                                    <img src="/trpg/Images/ic_collapse.png" style=
                                        {
                                            sobreHistoriaCollapse
                                                ? { transform: "rotate(90deg)" }
                                                : { transform: "rotate(180deg)" }
                                        }
                                        className="img-collapse" />
                                </div>
                                <div className="col-3 d-flex text-start align-middle">
                                    <label className="lbl-titulo">História</label>
                                </div>
                            </div>
                            <div className="row row-valores" hidden={sobreHistoriaCollapse}>
                                <textarea value={sobreHistoria} onChange={e => { setSobreHistoria(e.target.value) }} className="form-control form-control-div-grupo form-anotacoes" placeholder="" rows="auto" />
                            </div>
                        </div>
                    </div>

                    {/* Col left - Row 10 - Anotações */}
                    <div className="div-grupo" style=
                        {
                            anotacoesCollapse
                                ? { padding: "0" }
                                : null
                        }
                    >
                        <div onClick={() => ToggleCollapse(anotacoesCollapse, setAnotacoesCollapse)} className="row row-grupo-collapse mb-1">
                            <div className="col-1 col-img-collapse text-end p-0">
                                <img src="/trpg/Images/ic_collapse.png" style=
                                    {
                                        anotacoesCollapse
                                            ? { transform: "rotate(90deg)" }
                                            : { transform: "rotate(180deg)" }
                                    }
                                    className="img-collapse" />
                            </div>
                            <div className="col-5 d-flex text-start align-middle">
                                <label className="lbl-titulo">Anotações</label>
                            </div>
                        </div>
                        <div className="row-valores" hidden={anotacoesCollapse}>
                            <textarea value={anotacoes} onChange={e => { setAnotacoes(e.target.value) }} className="form-control form-control-div-grupo form-anotacoes" placeholder="" rows="auto" />
                        </div>
                    </div>
                </div>

                {/* Col right */}
                <div className="col-lg mb-3">

                    {/* Col right - Row 1 */}
                    <h1 className="lbl-titulo2">Perícias</h1>
                    <div className="row row-pericias mb-3">

                        <SkillsList
                            arraySkills={arraySkills}
                            nivel={nivel}
                            armaduraPenalidade={armaduraPenalidade}
                            escudoPenalidade={escudoPenalidade}
                            setRolarDadosPopup={setRolarDadosPopup}
                            setDados={setDados}
                            setFaces={setFaces}
                            setModificadorSomar={setModificadorSomar}
                            setModificadorSubtrair={setModificadorSubtrair}
                            RollAnimate={RollAnimate}
                            setRollAnimation={setRollAnimation}
                        />
                        <div className="mb-3">
                            <div className="row text-center">
                                <label>÷ Penalidade de armadura</label>
                            </div>
                            <div className="row text-center">
                                <label>* Somente treinado</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section >
}