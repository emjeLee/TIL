# Git 이란?
- 소스코드를 효과적으로 관리하기 위해 개발된 '분산형 버전 관리 시스템'
- 특정 시점에 저장된 버전과 비교하거나 특정 시점으로 되돌아갈 수도 있음

## git 저장소 만들기
- git init  
  - 현재 디렉토리에 저장소를 만든다는 의미 
- git clone  
  - 저장소에 있는 것을 내 로컬에 복제 한다는 의미
  - `git clone <저장소 주소>`

## git 원격저장소
- git remote -v  
  - 현재 디렉토리 원격저장소 확인
- git remote add origin <레파지스토리 주소>   
  - 원격 저장소 지정

## git commit 취소
- git reset --soft HEAD^  
   - staged / 디렉터리 보존  
- git reset --mixed HEAD^ (기본)  
   - unstaged / 디렉터리 보존  
- git reset --hard HEAD^
   - unstaged / 디렉터리 삭제
