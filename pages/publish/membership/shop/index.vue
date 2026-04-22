<template>
    <div class="membership-memeber">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
            </div>
            <div class="col d-flex">
                <div class="d-flex">
                    <select>
                        <option>이름</option>
                    </select>
                    <input type="text" v-model="nickname" placeholder="닉네임" @keyup.enter="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ tableList.length }}</span></div>
        <div class="select-default"> 
            <select>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="40">40개씩 보기</option>
                <option value="50">50개씩 보기</option>
                <option value="60">60개씩 보기</option>
                <option value="70">70개씩 보기</option>
                <option value="80">80개씩 보기</option>
                <option value="90">90개씩 보기</option>
                <option value="100">100개씩 보기</option>
            </select>
        </div>
      </div>
      <div class="table type03 mob-type02">
        <div class="table-head">
          <div class="table-head-col">No</div>
          <div class="table-head-col">지역</div>
          <div class="table-head-col">매장</div>
          <div class="table-head-col">아이디</div>
          <div class="table-head-col">대표자</div>
          <div class="table-head-col">장비수</div>
          <div class="table-head-col">연락처</div>
          <div class="table-head-col">등록일</div>
          <div class="table-head-col">상태</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" v-for="(item, index) in tableList" :key="index">
            <div class="table-body-flex">
              <div class="table-body-col">{{ index + 1 }}</div>
              <div class="table-body-col">{{ item.region }}</div>
              <div class="table-body-col">
                <nuxt-link :to="`/publish/membership/shop/${index}`" class="text-underline">{{ item.shop }}</nuxt-link>
              </div>
              <div class="table-body-col">{{ item.id }}</div>
              <div class="table-body-col">{{ item.name }}</div>
              <div class="table-body-col">
                <button type="button" class="color-purple text-underline" @click="modalOpen">{{ item.count }}</button>
              </div>
              <div class="table-body-col">{{ item.number }}</div>
              <div class="table-body-col">{{ item.date }}</div>
              <div class="table-body-col">
                <span v-if="item.status === '정상'" class="color-green">{{ item.status }}</span>
                <span v-else-if="item.status === '탈퇴'" class="color-red">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>
        <ul class="pagination-container type02">
          <li>
              <button type="button" class="paginate-buttons" aria-label="이전">
                  <img src="/images/icon/icon_prev.png" alt="icon_prev"/>
              </button>
          </li>
          <li>
              <button type="button" class="paginate-buttons active">1</button>
          </li>
          <li>
              <button type="button" class="paginate-buttons">2</button>
          </li>
          <li>
              <button type="button" class="paginate-buttons">3</button>
          </li> 
          <li>
              <button type="button" class="paginate-buttons" aria-label="더보기">
                  <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
              </button>
          </li>
          <li>
              <button type="button" class="paginate-buttons" aria-label="다음">
                  <img src="/images/icon/icon_next.png" alt="icon_next"/>
              </button>
          </li>
        </ul>
      </div>
    </div>

    <modal-member-info
      :isOpen="modals.modalMemberInfo"
      @update:isOpen="modals.modalMemberInfo = $event"/>

    <modal-machine-info
      :isOpen="modals.modalMachineInfo"
      @update:isOpen="modals.modalMachineInfo = $event"/>

</template>
<script setup>
const tableList = [
  {
    region: '경기도',
    shop: '가나스크린',
    id: 'gana screen',
    name: '김주인',
    count: 10,
    number: '02-1234-1234',
    date: '2026.08.08',
    status: '탈퇴'
  },
  {
    region: '경기도',
    shop: '가나스크린',
    id: 'gana screen',
    name: '김주인',
    count: 10,
    number: '02-1234-1234',
    date: '2026.08.08',
    status: '정상'
  },
  {
    region: '경기도',
    shop: '가나스크린',
    id: 'gana screen',
    name: '김주인',
    count: 10,
    number: '02-1234-1234',
    date: '2026.08.08',
    status: '탈퇴'
  },
]

const modals = reactive({ modalMemberInfo: false });
const modalOpen = () => { 
    modals['modalMachineInfo'] = true;
    document.querySelector('body').classList.add('is-hidden');
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>