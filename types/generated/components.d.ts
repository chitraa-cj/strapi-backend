import type { Schema, Struct } from '@strapi/strapi';

export interface DefaultBhashyaEntries extends Struct.ComponentSchema {
  collectionName: 'components_shared_bhashya_entries';
  info: {
    displayName: 'TeekaEntries';
  };
  attributes: {
    teeka: Schema.Attribute.Relation<'oneToOne', 'api::teeka.teeka'>;
    TeekaEntry: Schema.Attribute.Component<
      'shared.text-and-translation',
      false
    >;
  };
}

export interface ElementsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_sections';
  info: {
    displayName: 'Text Section';
    icon: 'align-left';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface SharedBook extends Struct.ComponentSchema {
  collectionName: 'components_shared_books';
  info: {
    displayName: 'Book';
  };
  attributes: {};
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTextAndTranslation extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_and_translations';
  info: {
    displayName: 'TextAndTranslation';
    icon: 'dashboard';
  };
  attributes: {
    EnglishTranslationText: Schema.Attribute.Blocks;
    IASTTransliteration: Schema.Attribute.Blocks;
    OtherTranslations: Schema.Attribute.Component<'shared.translations', true>;
    SanskritTextEntry: Schema.Attribute.Blocks;
  };
}

export interface SharedTranslations extends Struct.ComponentSchema {
  collectionName: 'components_shared_translations';
  info: {
    displayName: 'Translations';
    icon: 'dashboard';
  };
  attributes: {
    isAiTranslated: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    LanguageOfTranslation: Schema.Attribute.Enumeration<
      [
        'Sanskrit',
        'Hindi',
        'English',
        'Kannada',
        'Telugu',
        'Tamil',
        'Malayalam',
        'Gujarati',
        'Bengali',
        'Marathi',
        'Odia',
        'Punjabi',
        'Assamese',
        'Konkani',
        'Sinhala',
        'German',
        'French',
        'Spanish',
        'Portuguese',
        'Italian',
        'Dutch',
        'Russian',
        'Ukrainian',
        'Greek',
        'Polish',
        'Czech',
        'Romanian',
        'Hungarian',
        'Turkish',
        'Persian',
        'Arabic',
        'Hebrew',
        'Japanese',
        'Korean',
        'Thai',
        'Vietnamese',
        'Indonesian',
        'Malay',
        'Burmese',
        'Tibetan',
        'Mongolian',
        'Amharic',
        'Swahili',
        'Mandarin',
        'Egyptian_Arabic',
      ]
    > &
      Schema.Attribute.DefaultTo<'English'>;
    TranslationText: Schema.Attribute.Blocks;
  };
}

export interface SharedWordMeaning extends Struct.ComponentSchema {
  collectionName: 'components_shared_word_meanings';
  info: {
    displayName: 'WordMeaning';
    icon: 'bulletList';
  };
  attributes: {
    meaning: Schema.Attribute.Text;
    position: Schema.Attribute.Integer;
    word: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'default.bhashya-entries': DefaultBhashyaEntries;
      'elements.text-section': ElementsTextSection;
      'shared.book': SharedBook;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.text-and-translation': SharedTextAndTranslation;
      'shared.translations': SharedTranslations;
      'shared.word-meaning': SharedWordMeaning;
    }
  }
}
