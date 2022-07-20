# 선형 조사법 해시테이블
Hash 충돌이 발생했을 때, 그 **다음 주소**를 확인하고 **비어있다면** 그 자리에 대신 저장하는 해시테이블 기반 자료구조

# 구현 메서드
- 객체 초기화 / 크기반환
    - LinearHashTable.clear(), LinearHashTable.size()
- 전체 데이터 반환, 전체 데이터 출력
    - LinearHashTable.getBuffer(), LinearHashTable.print() 
- 데이터 추가 / 삭제 / 반환
    - LinearHashTable.put(), LinearHashTable.remove(), LinearHashTable.get()
