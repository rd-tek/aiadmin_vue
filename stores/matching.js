import { defineStore } from 'pinia'

export const useMatchingStore = defineStore('matching', {
  state: () => ({

    // 스마트매칭
    smartMatchingList: [
      {
        index: 0,
        image: '/images/default/img_Rectangle 40314.png',
        title: '홍길동 님의 1일 스마트 매칭',
        date: '2024.10.12 09:10:00',
        club: 'I7'
      },
      {
        index: 1,
        image: '/images/default/img_Rectangle 40314 (1).png',
        title: '홍길동 님의 2일 스마트 매칭',
        date: '2024.10.12 09:10:00',
        club: 'I7'
      },
      {
        index: 2,
        image: '/images/default/img_Rectangle 40314 (2).png',
        title: '홍길동 님의 3일 스마트 매칭',
        date: '2024.10.12 09:10:00',
        club: 'I7'
      },
      {
        index: 3,
        image: '/images/default/img_Rectangle 40314 (3).png',
        title: '홍길동 님의 4일 스마트 매칭',
        date: '2024.10.12 09:10:00',
        club: 'I7'
      }
    ],

    // 스마트매칭 추천강의
    smartMatchingRecommendList: [
      {
        index: 0,
        slug: 0,
        image: '/images/default/img_Rectangle 40314.png',
        title: '홍길동 님의 1일 스마트 매칭 추천강의',
        date: '2025.12.12',
        lecture: 4
      },
      {
        index: 1,
        slug: 1,
        image: '/images/default/img_Rectangle 40314 (1).png',
        title: '홍길동 님의 2일 스마트 매칭 추천강의',
        date: '2025.12.12',
        lecture: 4
      },
      {
        index: 2,
        slug: 2,
        image: '/images/default/img_Rectangle 40314 (2).png',
        title: '홍길동 님의 3일 스마트 매칭 추천강의',
        date: '2025.12.12',
        lecture: 4
      },
      {
        index: 3,
        slug: 3,
        image: '/images/default/img_Rectangle 40314 (3).png',
        title: '홍길동 님의 4일 스마트 매칭 추천강의',
        date: '2025.12.12',
        lecture: 4
      }
    ],

    // 나의 강좌
    myLectureList: [
      {
          id: 0,
          image: '/images/default/img_Rectangle 40314.png',
          title: '나의강좌 님의 1일 스마트 매칭',
          date: '2025.12.12',
          lecture: 4
      },
      {
          id: 1,
          image: '/images/default/img_Rectangle 40314 (1).png',
          title: '나의강좌 님의 2일 스마트 매칭',
          date: '2025.12.12',
          lecture: 4
      },
      {
          id: 2,
          image: '/images/default/img_Rectangle 40314 (2).png',
          title: '나의강좌 님의 3일 스마트 매칭',
          date: '2025.12.12',
          lecture: 4
      },
      {
          id: 3,
          image: '/images/default/img_Rectangle 40314 (3).png',
          title: '나의강좌 님의 4일 스마트 매칭',
          date: '2025.12.12',
          lecture: 4
      }
    ],

    // 클래스 리스트
    classList: [
      {
          name: '싱글로 가는 숏게임 마스터 클래스 1',
          slug: 1,
          children: [
              {
                  name: '어프로치 연습',
                  slug: 1
              },
              {
                  name: '벙커 샷',
                  slug: 2
              },
          ]
      },
      {
          name: '싱글로 가는 숏게임 마스터 클래스 2',
          slug: 2,
          children: [
              {
                  name: '어프로치 연습',
                  slug: 1
              },
              {
                  name: '벙커 샷',
                  slug: 2
              },
          ]
      },
    ],

    // 나의 라운드
    myRoundList: [
      {
          title: '나의 라운드 1',
          label: ['가나 스크린', 'Montvert'],
          subLabel: ['18홀', '73타수', '2024-05-01 09:30:10'],
          state: '완료'
      },
      {
          title: '나의 라운드 2',
          label: ['가나 스크린', 'Montvert'],
          subLabel: ['18홀', '73타수', '2024-05-01 09:30:10'],
          state: '중단'
      },
      {
          title: '나의 라운드 3',
          label: ['가나 스크린', 'Montvert'],
          subLabel: ['18홀', '73타수', '2024-05-01 09:30:10'],
          state: '대기'
      }
    ],

    // 나의 토너먼트
    myTournamentList: [
      {
          title: '나의 토너먼트 1',
          label: '전체',
          subLabel: ['참여횟수: 3/10', '2024-05-01 ~ 2025-05-31'],
          state: '완료'
      },
      {
          title: '나의 토너먼트 2',
          label: '전체',
          subLabel: ['참여횟수: 3/10', '2024-05-01 ~ 2025-05-31'],
          state: '대기'
      },
      {
          title: '나의 토너먼트 3',
          label: '전체',
          subLabel: ['참여횟수: 3/10', '2024-05-01 ~ 2025-05-31'],
          state: '중단'
      },
    ],

    // 나의 이벤트
    myEventList: [
      {
          label: [
              {
                  type: 'rank',
                  name: '니어핀 랭크',
              },
              {
                  type: 'shop',
                  name: 'A 매장'
              }
          ],
          title: '나의 이벤트 1', 
          subLabel: ['프로스틴밸리', '14홀', '2024-05-01 09:30:10'],
      },
      {
          label: [
              {
                  type: 'rank',
                  name: '니어핀 랭크',
              },
              {
                  type: 'shop',
                  name: 'A 매장'
              }
          ],
          title: '나의 이벤트 2', 
          subLabel: ['프로스틴밸리', '14홀', '2024-05-01 09:30:10'],
      },
      {
          label: [
              {
                  type: 'rank',
                  name: '니어핀 랭크',
              },
              {
                  type: 'shop',
                  name: 'A 매장'
              }
          ],
          title: '나의 이벤트 3', 
          subLabel: ['프로스틴밸리', '14홀', '2024-05-01 09:30:10'],
      },
    ],

    // 나의 스윙
    mySwingList: [
      {
          label: '공개',
          title: '나의 스윙 1',
          info: ['클럽: I7', '2024.10.12 09:10:00', 'XGOLF 대전']
      },
      {
          label: '공개',
          title: '나의 스윙 2',
          info: ['클럽: I7', '2024.10.12 09:10:00', 'XGOLF 대전']
      },
      {
          label: '공개',
          title: '나의 스윙 3',
          info: ['클럽: I7', '2024.10.12 09:10:00', 'XGOLF 대전']
      },
    ]
  }),
  actions: {

    // 스마트매칭
    removeSmartMatchingList(targetIndex) {
      this.smartMatchingList = this.smartMatchingList.filter((_, i) => i !== targetIndex)
    },

    // 스마트매칭 추천강의
    removeSmartMatchingRecommendList(targetIndex) {
      this.smartMatchingRecommendList = this.smartMatchingRecommendList.filter((_, i) => i !== targetIndex)
    },

    // 나의 강좌
    removeMyLecture(targetIndex) {
      this.myLectureList = this.myLectureList.filter((_, i) => i !== targetIndex)
    },

    // 나의 클래스
    removeClassList() {
      this.classList = this.classList.filter((_, i) => i !== targetIndex)
    },

    // 나의 라운드
    removeMyRoundList() {
      this.myRoundList = this.myRoundList.filter((_, i) => i !== targetIndex)
    },

    // 나의 토너먼트
    removeMyTournamentList() {
      this.myTournamentList = this.myTournamentList.filter((_, i) => i !== targetIndex)
    },

    // 나의 이벤트
    removeMyEventList() {
      this.myEventList = this.myEventList.filter((_, i) => i !== targetIndex)
    },

    // 나의 스윙
    removeMySwingList() {
      this.mySwingList = this.mySwingList.filter((_, i) => i !== targetIndex)
    },


    // 스마트매칭 리스트
    addSmartMatchingListItem(item) {
      this.smartMatchingList.push(item)
    },


    // 스마트매칭 추천강의
    addSmartMatchingRecommendListItem(item) {
      this.smartMatchingRecommendList.push(item)
    },


    // 나의 강좌
    addMyLectureItem(item) {
      this.myLectureList.push(item)
    },

    // 클래스 리스트
    addClassItem(item) {
      this.classList.push(item)
    },

    // 나의 라운드
    addMyRoundListItem(item) {
      this.myRoundList.push(item)
    },

    // 나의 토너먼트
    addMyTournamentListItem(item) {
      this.myTournamentList.push(item)
    },

    // 나의 이벤트
    addMyEventListItem(item) {
      this.myEventList.push(item)
    },

    // 나의 스윙
    addMySwingListItem(item) {
      this.mySwingList.push(item)
    }

  }

})
