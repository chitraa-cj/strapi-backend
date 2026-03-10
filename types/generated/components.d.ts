import type { Schema, Struct } from '@strapi/strapi';

export interface DefaultBhashyaEntries extends Struct.ComponentSchema {
  collectionName: 'components_shared_bhashya_entries';
  info: {
    displayName: 'TeekaEntries';
  };
  attributes: {
    TeekaAuthor: Schema.Attribute.Enumeration<
      ['Anandagiri', 'Ramaraya Kavi', 'Gopalananda', 'Narayanasrami']
    >;
    TeekaEntry: Schema.Attribute.Component<
      'shared.text-and-translation',
      false
    >;
    TeekaName: Schema.Attribute.String;
  };
}

export interface DefaultShlokaManthraEntries extends Struct.ComponentSchema {
  collectionName: 'components_default_shloka_manthra_entries';
  info: {
    displayName: 'ShlokaManthraEntries';
  };
  attributes: {};
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
    LanguageOfTranslation: Schema.Attribute.Enumeration<
      [
        'Tamil',
        'Kannada',
        'Telugu',
        'Mandarin',
        'Arabic',
        'French',
        'Spanish',
        'Hindi',
        'German',
        'Vietnamese',
        'Assamese',
        'Kashmiri',
        'Marathi',
        'Konkani',
        'Malayalam',
        'Punjabi',
        'Bengali',
        'Manipuri',
        'Nepali',
        'Urdu',
        'Azerbaijani',
        'Odia',
        'Sindhi',
        'Polish',
        'Dutch',
        'Swahili',
        'Swedish',
        'Greek',
        'Amharic',
        'Hebrew',
        'Portuguese',
        'Russian',
        'Indonesian',
        'Japanese',
        'Nigerian Pidgin',
        'Egyptian Arabic',
        'Hausa',
        'Turkish',
        'Korean',
        'Thai',
        'Italian',
        'Sinhalese',
        'Ukrainian',
        'Persian',
        'Kurdish',
        'Mongolian',
        'Tibetan',
        'Burmese',
        'Malay',
        'Gujarati',
        'Bhojpuri',
      ]
    >;
    OtherLanguagesTranslation: Schema.Attribute.Blocks;
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
    LanguageOfTranslation: Schema.Attribute.Enumeration<
      ['English', 'Tamil', 'Hindi', 'Gujarati', 'Marathi']
    > &
      Schema.Attribute.DefaultTo<'English'>;
    TranslationText: Schema.Attribute.Blocks;
    TransliterationText: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'default.bhashya-entries': DefaultBhashyaEntries;
      'default.shloka-manthra-entries': DefaultShlokaManthraEntries;
      'elements.text-section': ElementsTextSection;
      'shared.book': SharedBook;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.text-and-translation': SharedTextAndTranslation;
      'shared.translations': SharedTranslations;
    }
  }
}
