import ButtonLink from "components/ETC/ButtonLink";
import React from "react";
import styles from "./AboutPage.module.sass";

const AboutPage = () => {
  // const [mods, setMods] = useState([]);

  /* useEffect(() => {
    const getMods = async () => {
      const data = await getServerInfoV2();

      if (data?.mods?.names) {
        setMods(data.mods.names);
      }
    };
    getMods();
  }, []); */

  return (
    <div className={styles.aboutDiv}>
      <h1>О нас</h1>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div className={styles.homePageButtons}>
          <ButtonLink
            text="Наш дискорд сервер"
            href="https://discord.gg/xaFCzGarws"
            title="Discord сообщество проекта"
          />
          <ButtonLink
            text="Наша группа ВК"
            href="https://vk.com/tfcsurvivalru"
            title="Группа проекта в соц сети ВКонтакте"
          />
        </div>
        <br />
        <h5>Мы есть на мониторингах, голосуйте за нас</h5>
        <br />

        <div>
          <ButtonLink
            text="minecraftratig.ru"
            href="https://minecraftrating.ru/vote/114193/"
            title="Проголосовать"
            variant="green"
            style={{ borderRadius: "5px 0px 0px 5px" }}
          />
          <ButtonLink
            text="monitoringminecraft.ru"
            href="https://monitoringminecraft.ru/top/tfc-survival"
            title="Проголосовать"
            variant="green"
            style={{ margin: "0px", borderRadius: "0px 5px 5px 0px" }}
          />
        </div>
      </div>
      <br />
      <hr />
      <br />
      <p>
        Данный terrafirmacraft сервер является наследником сервера
        tfc-survival.ru (проект zenin'a, а зетем в последстии RaDiC'a). Концепт
        данного сервера берет своё начало ещё в 2014 году с проекта zenin'a. Мы
        продолжаем их идею с небольшими изменениями и стараемся сохранить все
        самое лучшее. Сервер полностью не коммерческий, доната тут в привычном
        его понимании нет и не будет, есть только добровольные пожертвования,
        которые идут на оплату домена, хостинга, сладкий хлеб для администрации
        (данный сервер создан не для получения прибыли). Так же из особенностей
        сервера можно выделить: бесплатные HD скины/плащи, уникальный в своем
        роде плагин приватов и системы городов towny, более актуальную версию
        игры - 1.12.2, некоторые самописанные моды, лояльное отношение
        администрации к игрокам, минимум ограничений, максимальное уклон игровых
        механник к реальным
      </p>
      {/* <br />
      <p>
        TerraFirmaCraft (основной мод) TFC - это мод, радикально меняющий
        механику игры в сторону реализма. Никакой херни - сначала каменный век,
        вам придется обтёсывать камни для изготовления орудий, еду нужно жарить
        на костре, животных приручать, инструменты ковать, а не крафтить на
        вестаке и т.д.
      </p>
      <br />
      <p>
        Towny (основа для привата) Тут нет приватов в привычном их понимании,
        вместо этого вы вступаете в город, которым управляет другой живой игрок,
        он вам выдаёт чанки с вашим личным приватом, примыкающим к городу, это
        создаёт уникальный игровой опыт и взаимодействие между игроками,
        например: нападение одного города на другой, торговля и т.д. Также вы
        можете основать свой город но это очень не просто так как накопить
        нужную сумму игровой валюты будет сложно.
      </p> */}
      <br />
      <p>
        Список модификаций: tfc-tng, advanced tfc tech, antiueatlas,
        astikorcarts, caryon, davicisvessels, dynmap, immersiveengenering,
        immersive energy, immersivelligence, immersivepetroleum,
        immersivetechnology, mmmmmmmmmmmm, puddles, terrafirmathings,
        tfcdecoration, tfcdryingrack, tfcagreddrinks, tfcsurvivalstuff, tfctech,
        threechop, voicechatreloaded, waterflasks, wearablebackpacks,
        dynamictrees tfc, tfc-survivalstuff.
        {/* {" "}
        {mods.map((v) => (
          <span className="mod">{v}, </span>
        ))} */}
      </p>
      <br />
      <p>
        Администрация проекта:
        <ol>
          <li>__xelo__ - Создатель проекта</li>
          <li>hohserg - баг-фиксер/мододел</li>
          <li>Taper4ik - мододел/писатель рецептов/переводчик</li>
          <li>koenigstag - разработчик сайта</li>
          <li>Gainfull_Gremlin - баг-фиксер</li>
          <li>Khanivore - билдер</li>
          <li>Jykk - редактор постов</li>
        </ol>
      </p>
      <br />
      <p>
        Для связи с администрацией заходите на наш{" "}
        <a href="https://discord.gg/xaFCzGarws" target="_blank" rel="noreferrer" >Дискорд сервер</a>.
      </p>
    </div>
  );
};

export default AboutPage;
