import { getToken } from "./api";

interface URLSchemeType {
  origin: string;
  parameter: string;
}
const CLIENT_ID = "766b8aab7f3f4406a5d4844f5a0c6bd7";
const AUTHORIZE_ENDPOINT = "https://eu.battle.net/oauth/authorize";
const redirectUri = "https://wowme.gg/oauth/callback_overwolf";
const scope = ["wow.profile", "openid"];

export const scopesString = encodeURIComponent(scope.join(" "));
export const redirectUriString = encodeURIComponent(redirectUri);
export const authorizeUrl = `${AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&scope=${scopesString}&redirect_uri=${redirectUriString}&response_type=code`;

export const onLogin = () => {
  overwolf.utils.openUrlInDefaultBrowser(authorizeUrl);
};

export const callbackOAuth = async (urlscheme: URLSchemeType) => {
  const url = new URL(decodeURIComponent(urlscheme.parameter));
  const code = url.searchParams.get("code");
  console.log("got it");

  try {
    const userInfo = await getToken({ code, isOverwolf: true });
    const token = userInfo.token;
    const expiresIn = Date.now() + userInfo.expiresIn * 1000;

    // const inGame = InGame.instance();

    // inGame.setBattleTag(userInfo.battleTag);
    // inGame.setBattleId(userInfo.battleId);
    // inGame.setBattleCred(userInfo.battleCred);
    // inGame.setCharacters(userInfo.characters);
    // inGame.setRegion(userInfo.region);

    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn.toString());
    localStorage.setItem("battleTag", userInfo.battleTag);
    localStorage.setItem("battleId", userInfo.battleId);
    localStorage.setItem("battleCred", userInfo.battleCred);
    localStorage.setItem("region", userInfo.region);

    // inGame.onLoggedIn();
    // inGame.getUserJournals();
  } catch (e) {
    console.log(e);
  }
};
