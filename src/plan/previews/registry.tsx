import type { ReactNode } from 'react'
import type { PlanText } from '../../types'
import { TierScreen } from '../TierPreviewPage'
import { ForecastScreen, MentorQueueScreen, ScholarshipScreen, TuningScreen } from './AiPreview'
import { ResultsScreen, SchoolApplicationScreen, SchoolListScreen } from './ApplicationPreview'
import { MissionsScreen, TopUpScreen, WalletScreen } from './CoinPreview'
import { AssignmentDrawerScreen, MentorBoardScreen } from './JourneyPreview'
import { ComposerScreen, FeedScreen, ModerationScreen } from './NewsfeedPreview'
import { ExtracurricularScreen, LandingScreen, LeadConsoleScreen } from './OtherPreview'
import { BookingScreen, ClassListScreen, ScheduleScreen, StudioScreen } from './TutorPreview'

export type PreviewScreen = {
  line: PlanText
  mock: ReactNode
}

function screen(id: string, sectionId: string, text: string, mock: ReactNode): PreviewScreen {
  return { line: { id, sectionId, kind: 'text', text }, mock }
}

export const featurePreviews: Record<string, PreviewScreen[]> = {
  'goi-ba-tier': [
    screen('ui-dashboard', 'journey-student', 'Dashboard', <TierScreen screen="dashboard" />),
    screen('ui-journey', 'journey-student', 'Journey', <TierScreen screen="journey" />),
    screen('ui-goi-ba-tier-assignment', 'journey-student', 'Assignment drawer', <AssignmentDrawerScreen />),
    screen('ui-goi-ba-tier-mentor-board', 'journey-student', 'Bảng theo dõi học sinh của mentor', <MentorBoardScreen />),
  ],
  'application-management': [
    screen('ui-application-management-schools', 'cac-feature', 'Danh sách trường', <SchoolListScreen />),
    screen('ui-application-management-school', 'cac-feature', 'Hồ sơ một trường', <SchoolApplicationScreen />),
    screen('ui-application-management-results', 'cac-feature', 'Kết quả và chọn offer', <ResultsScreen />),
  ],
  'coin-system-mission': [
    screen('ui-coin-system-mission-wallet', 'cac-feature', 'Ví coin', <WalletScreen />),
    screen('ui-coin-system-mission-topup', 'cac-feature', 'Nạp coin và kết quả', <TopUpScreen />),
    screen('ui-coin-system-mission-missions', 'cac-feature', 'Nhiệm vụ', <MissionsScreen />),
  ],
  tutor: [
    screen('ui-tutor-classes', 'tutor', 'Danh sách lớp', <ClassListScreen />),
    screen('ui-tutor-booking', 'tutor', 'Chi tiết lớp và đặt chỗ', <BookingScreen />),
    screen('ui-tutor-schedule', 'tutor', 'Lịch học của tôi', <ScheduleScreen />),
    screen('ui-tutor-studio', 'tutor', 'Studio mở lớp', <StudioScreen />),
  ],
  newsfeed: [
    screen('ui-newsfeed-feed', 'cac-feature', 'Feed', <FeedScreen />),
    screen('ui-newsfeed-composer', 'cac-feature', 'Đăng bài và Bài của tôi', <ComposerScreen />),
    screen('ui-newsfeed-moderation', 'cac-feature', 'Kiểm duyệt', <ModerationScreen />),
  ],
  'ai-application': [
    screen('ui-ai-application-tuning', 'cac-feature', 'AI tinh chỉnh journey', <TuningScreen />),
    screen('ui-ai-application-mentor-queue', 'cac-feature', 'Hàng chờ AI đề xuất của mentor', <MentorQueueScreen />),
    screen('ui-ai-application-forecast', 'cac-feature', 'AI dự báo việc làm và định cư', <ForecastScreen />),
    screen('ui-ai-application-scholarship', 'cac-feature', 'Học bổng và match %', <ScholarshipScreen />),
  ],
  'feature-other': [
    screen('ui-feature-other-landing', 'cac-feature', 'Landing và form tư vấn', <LandingScreen />),
    screen('ui-feature-other-leads', 'cac-feature', 'Lead và bàn giao', <LeadConsoleScreen />),
    screen('ui-feature-other-extracurricular', 'cac-feature', 'Ngoại khoá', <ExtracurricularScreen />),
  ],
}
