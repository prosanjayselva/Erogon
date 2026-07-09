import { create } from 'zustand';
import { fetchSiteContent, submitContact, submitInterest } from '@/lib/api';
import type { ContactPayload, InterestPayload, SiteContent } from '@/types/site';

type RequestState = 'idle' | 'loading' | 'success' | 'error';

type FormFeedback = {
  state: RequestState;
  message: string | null;
};

type SiteStore = {
  content: SiteContent | null;
  contentState: RequestState;
  errorMessage: string | null;
  mobileNavOpen: boolean;
  activeStoryIndex: number;
  contactFeedback: FormFeedback;
  interestFeedback: FormFeedback;
  loadContent: () => Promise<void>;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  setActiveStory: (index: number) => void;
  sendContact: (payload: ContactPayload) => Promise<void>;
  sendInterest: (payload: InterestPayload) => Promise<void>;
  clearFeedback: (form: 'contact' | 'interest') => void;
};

const idleFeedback: FormFeedback = {
  state: 'idle',
  message: null,
};

export const useSiteStore = create<SiteStore>((set, get) => ({
  content: null,
  contentState: 'idle',
  errorMessage: null,
  mobileNavOpen: false,
  activeStoryIndex: 0,
  contactFeedback: idleFeedback,
  interestFeedback: idleFeedback,
  async loadContent() {
    if (get().contentState === 'loading' || get().content) {
      return;
    }

    set({ contentState: 'loading', errorMessage: null });

    try {
      const content = await fetchSiteContent();
      set({ content, contentState: 'success' });
    } catch (error) {
      set({
        contentState: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unable to load content.',
      });
    }
  },
  toggleMobileNav() {
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen }));
  },
  closeMobileNav() {
    set({ mobileNavOpen: false });
  },
  setActiveStory(index) {
    set({ activeStoryIndex: index });
  },
  async sendContact(payload) {
    set({ contactFeedback: { state: 'loading', message: null } });

    try {
      const response = await submitContact(payload);
      set({ contactFeedback: { state: 'success', message: response.message } });
    } catch (error) {
      set({
        contactFeedback: {
          state: 'error',
          message: error instanceof Error ? error.message : 'Unable to send the message.',
        },
      });
    }
  },
  async sendInterest(payload) {
    set({ interestFeedback: { state: 'loading', message: null } });

    try {
      const response = await submitInterest(payload);
      set({ interestFeedback: { state: 'success', message: response.message } });
    } catch (error) {
      set({
        interestFeedback: {
          state: 'error',
          message: error instanceof Error ? error.message : 'Unable to submit your interest.',
        },
      });
    }
  },
  clearFeedback(form) {
    set(form === 'contact' ? { contactFeedback: idleFeedback } : { interestFeedback: idleFeedback });
  },
}));

