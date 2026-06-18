<template>
    <div class="game-data">

      <!-- 게임정보 -->
      <div class="game-data-wrap">
        <div class="game-data-title">
          게임정보
        </div>
        <div class="game-data-cont">
            <template v-if="gameinfoList !== ''">
                <table class="table type04" :class="{ 'is-move': gameinfoListMove }" ref="gameinfoListRef">
                    <colgroup>
                        <col width="120px">
                        <col width="*%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>게임 번호</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.gameno || '-' }}</td>
                        </tr>
                        <tr>
                            <th>플레이어 번호</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.gameplayerno || '-' }}</td>
                        </tr>
                        <tr>
                            <th>회원 번호</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.playerno || '-' }}</td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.playername || '-' }}</td>
                        </tr>
                        <tr>
                            <th>닉네임</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.playernickname || '-' }}</td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.gender || '-' }}</td>
                        </tr>
                        <tr>
                            <th>티박스</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.teebox || '-' }}</td>
                        </tr>
                        <tr>
                            <th>멀리건</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.mulliganflag || '-' }}</td>
                        </tr>
                        <tr>
                            <th>난이도</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.gamelevel || '-' }}</td>
                        </tr>
                        <tr>
                            <th>홀당 퍼트 수</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.avgput || '-' }}</td>
                        </tr>
                        <tr>
                            <th>그린적중률</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.greenrate || '-' }}</td>
                        </tr>
                        <tr>
                            <th>평균 비거리</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.avgdistance || '-' }}</td>
                        </tr>
                        <tr>
                            <th>최대 비거리</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.maxdistance || '-' }}</td>
                        </tr>
                        <tr>
                            <th>페어웨이 안착률</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.farewayrate || '-' }}</td>
                        </tr>
                        <tr>
                            <th>파세이브율</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.parsave || '-' }}</td>
                        </tr>
                        <tr>
                            <th>홀인원</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.holeinone || '-' }}</td>
                        </tr>
                        <tr>
                            <th>알바트로스</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.albatross || '-' }}</td>
                        </tr>
                        <tr>
                            <th>이글</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.eagle || '-' }}</td>
                        </tr>
                        <tr>
                            <th>버디</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.birdie || '-' }}</td>
                        </tr>
                        <tr>
                            <th>파</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.par || '-' }}</td>
                        </tr>
                        <tr>
                            <th>완료 홀</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.holedone || '-' }}</td>
                        </tr>
                        <tr>
                            <th>시작시간</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.regdate || '-' }}</td>
                        </tr>
                        <tr>
                            <th>완료(중단)</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.enddate || '-' }}</td>
                        </tr>
                        <tr>
                            <th>매장</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.shopname || '-' }}</td>
                        </tr>
                        <tr>
                            <th>코스명</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.coursename || '-' }}</td>
                        </tr>
                        <tr>
                            <th>골프코스 코드</th>
                            <td v-for="(item, index) in gameinfoList" :key="index">{{ item.coursecode || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <div class="no-data" v-else>
                데이터가 없습니다.
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/manager/game-data" class="btn-md-line">목록 보기</nuxt-link>
            </div>
        </div>
      </div>

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useGameDataApi } from "@/api/gamedata";
import { useRoute } from "vue-router";

// 2026.03.04[cgnoh]: 라우터 설정
const route = useRoute();

// 2026.06.16[cgnoh]: api 관련
const { _gameInfo } = useGameDataApi();

// 2026.06.17[cgnoh]: 게임리스트 조회
const handleGameInfo = async () => {
  const gameno = route.params.slug;

  if (!gameno) {
    console.error("gameno 없음");
    return;
  }

  const res = await _gameInfo(gameno);
  gameinfoList.value = res.playerlist

  console.log(res);
};

// 2026.06.17[cgnoh]: 원샷정보 인터렉션
const gameinfoList = ref({});
const gameinfoListRef = ref();
const gameinfoListMove = ref(false);
useIntersectionObserver(gameinfoListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) gameinfoListMove.value = true;
}, { threshold: 0 });

onMounted(() => {
  handleGameInfo();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';
</style>