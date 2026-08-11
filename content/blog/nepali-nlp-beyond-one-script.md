---
title: "Nepali NLP Beyond One Script: Building for Devanagari, Romanized, Mixed, and English Text"
date: "2026-08-11"
excerpt: "Nepali NLP has better models and benchmarks than it did a few years ago, but real users do not stay inside one clean script. Robust systems must preserve meaning across Devanagari, Romanized Nepali, English, and code-mixed text."
image: "/images/blog/nepali-nlp-beyond-one-script.png"
imageAlt: "Four Nepali language styles converge into one robust language model and produce consistent understanding."
tags:
  - Nepali NLP
  - Low-Resource NLP
  - Robust NLP
  - Code-Mixing
---

## A Nepali Model Should Not Break When the Script Changes

A Nepali NLP model should not stop working because the user switches scripts.

That sounds obvious. In practice, it changes what we should train, what we should evaluate, and even what we mean by "Nepali data."

The Nepali used in a formal article is commonly written in Devanagari. The Nepali used in messages, comments, search queries, and community forums may be Romanized, shortened, mixed with English, or moved between all of these styles within a single conversation.

Consider one approximate meaning expressed four ways:

- **Devanagari Nepali:** `मलाई किताब पढ्न मन छ।`
- **Romanized Nepali:** `malai kitab padhna man cha`
- **English:** `I feel like reading a book.`
- **Mixed Nepali-English:** `malai book padhna man cha`

These strings are not identical, and they do not preserve every cultural or stylistic nuance. But for many downstream tasks, they express the same core intent. A robust system should not produce four unrelated interpretations merely because the surface form changed.

This is the gap I find most important in Nepali NLP today: we have made real progress on models and benchmarks, but our evaluation still represents a narrower language than the one people use.

## Where Nepali NLP Stands

The field is no longer starting from zero.

The [FLORES Nepali-English evaluation dataset](https://aclanthology.org/D19-1632/) established an important machine-translation benchmark in 2019. In 2022, [NepBERTa and Nep-gLUE](https://aclanthology.org/2022.aacl-short.34/) brought a Nepali-specific encoder trained on a corpus of 0.8 billion words from 36 news sites and a shared evaluation across named-entity recognition, part-of-speech tagging, content classification, and sentence-pair similarity.

The resource base has continued to grow. [Aksharantar](https://aclanthology.org/2023.findings-emnlp.4/) added Nepali to a large Indic transliteration corpus and showed the value of multilingual transfer for Roman-to-native-script conversion. A [2025 study of Nepali pre-trained models](https://aclanthology.org/2025.chipsal-1.2/) collected 27.5 GB of text and trained BERT, RoBERTa, and GPT-2 variants. Nepali also appears in research on [English-to-code-switching transfer](https://aclanthology.org/2020.acl-main.716/), which demonstrated that code-switch-aware training can outperform code-switch-unaware multilingual baselines on tasks such as language identification, NER, and POS tagging.

Most importantly for evaluation, the newer [Nepali Language Understanding Evaluation benchmark](https://aclanthology.org/2025.findings-ijcnlp.119/) expands the field from the four Nep-gLUE tasks to twelve datasets covering sentiment, acceptability, commonsense reasoning, paraphrase, semantic similarity, natural-language inference, coreference, and masked prediction. Its results also complicate the assumption that a monolingual model will always be best: the strongest multilingual model outperformed the strongest monolingual model across most of its tasks.

That is meaningful progress. Nepali NLP now has stronger corpora, encoders, generative experiments, transliteration resources, and a broader task suite.

But model coverage is not the same as usage coverage.

The 2025 NLUE paper explains that most of its new datasets were translated from English benchmarks, with manual correction and quality checks. It also reports filtering English and non-Nepali remnants and flagging code-switched cases during dataset construction. For a benchmark intended to measure clean Nepali NLU, those are defensible choices. They also mean that a good NLUE score does not tell us how the same model behaves when a user writes `k cha`, `k xa`, `k x`, `के छ`, or a sentence that moves between Nepali and English.

My conclusion is not that existing benchmarks are wrong. It is that they answer only part of the deployment question.

## The Real Problem Is Variation in Representation

Romanized Nepali is not simply Devanagari typed with a different alphabet. People approximate sounds differently, shorten words, change spacing, attach inflections inconsistently, and combine Nepali with English according to the platform and conversation.

The same expression may appear as `ke chha`, `k cha`, `k xa`, `k x`, or `के छ`. A system trained primarily on one of those forms may fragment the others into poor tokens or place them in unrelated parts of its representation space.

This is not only a script-conversion problem. The real objective is to learn that multiple surface forms can carry the same task-relevant meaning. Transliteration can be one useful resource, but success should be measured by stable understanding across the original styles—not by whether every input can be forced into one canonical form.

A recent [survey of transliteration in NLP](https://aclanthology.org/2026.findings-acl.1176/) describes the script barrier and the trade-offs of using transliteration as preprocessing, an auxiliary input, or part of a multi-script architecture. For Nepali NLP, that suggests a broader goal: models should learn across scripts while retaining the context and style present in the original input.

## What Robustness Should Mean for Nepali

Robustness is often reduced to accuracy on a noisy test set. I think Nepali needs a more explicit definition.

A robust Nepali system should preserve task-relevant meaning when script or writing style changes, while remaining sensitive to changes that genuinely alter meaning.

That distinction matters. Replacing `के छ` with `k xa` should usually be an invariance: the prediction should remain stable. Replacing `पानी` with `पनि` is not an invariance when it changes the sentence's meaning. Code-mixing may preserve meaning in one example and change tone, emphasis, or social context in another.

The benchmark therefore cannot be built by applying random character substitutions and assuming every generated string is equivalent. Native speakers must verify both naturalness and semantic preservation.

This idea connects directly to my earlier work on [robust hate-speech detection](https://aclanthology.org/2022.aacl-short.7/). In that setting, classifiers could rely on spurious lexical cues and fail when words were replaced or misspelled. The broader lesson is the same: a model that attaches its decision to surface shortcuts rather than the underlying signal will look strong until the surface changes.

For Nepali, script and Romanization variation make those shortcut failures part of normal use, not merely an adversarial edge case.

## A Better Cross-Style Benchmark

The most useful next benchmark would organize examples into semantic families rather than isolated rows.

Each family would begin with a naturally authored meaning and include human-validated variants such as:

- Standard Devanagari Nepali
- Careful Romanized Nepali
- Informal or compressed Romanized Nepali
- Nepali-English code-mixed text in Devanagari and Latin scripts
- An English version when English is a natural equivalent for the task
- Optional regional, demographic, or platform-specific variants collected with consent and appropriate documentation

The core test is simple: keep the intended meaning and label fixed, vary the expression, and measure whether the model remains consistent.

That benchmark should report more than one aggregate score:

- **Per-style quality:** accuracy, macro F1, retrieval recall, or the task's appropriate metric for every style separately
- **Worst-style quality:** the lowest score across Devanagari, Romanized, mixed, and English inputs
- **Robustness gap:** the difference between the best- and worst-performing styles
- **Paired consistency:** how often variants in the same semantic family receive different predictions
- **Calibration:** whether the model becomes uncertain when the input becomes ambiguous or unfamiliar
- **Tokenization cost:** whether one style fragments into far more tokens, increasing latency and weakening representations
- **Selective performance:** whether an abstention or clarification policy catches uncertain or unfamiliar inputs instead of forcing a confident answer

This follows the spirit of [behavioral testing with CheckList](https://aclanthology.org/2020.acl-main.442/): held-out accuracy is not enough when we care about a particular capability. Cross-script stability should be tested as a named behavior with explicit pass and failure conditions.

The data split matters just as much as the metric. All variants of one semantic family must stay in the same split. Otherwise, a benchmark may place the Devanagari sentence in training and its Romanized twin in testing, rewarding memorization rather than cross-style generalization. Stronger evaluation would also hold out authors, platforms, topics, and periods of time to measure realistic distribution shift.

## The Modeling Direction I Would Prioritize

There is unlikely to be one architecture that solves every Nepali NLP problem, but a sensible research program can combine several ideas.

### Learn from Parallel Style Views

When parallel Devanagari, Romanized, mixed, and English versions are available, train with them as related views of the same semantic example. Their representations should agree on the task while preserving information that is genuinely specific to language or style.

If those views lead to different predictions, the disagreement is a useful diagnostic. It reveals that the model may be relying on script or vocabulary shortcuts rather than the intended meaning.

### Train on Natural Variation

Synthetic Romanization can expand coverage, but it should not substitute for naturally written data. Real chat text contains abbreviations, inconsistent spacing, dialect, borrowed words, emojis, and conventions that a deterministic converter will not invent.

The training mixture should include clean Devanagari, natural Romanized Nepali, Devanagari-English mixing, Latin-script mixing, and English. Dataset documentation should record source, consent or public-data rationale, annotation process, dialect coverage, and known exclusions.

### Align Meaning Across Styles

Paired or grouped variants enable contrastive training: representations of meaning-preserving variants should be close, while genuinely different meanings should remain separable. The objective is not to erase every stylistic distinction. It is to make the task head less dependent on script when script is irrelevant to the decision.

Character-, byte-, or phoneme-aware components may help with rare spellings and token fragmentation, but they still need semantic supervision. Better token coverage is not the same as better understanding.

### Evaluate Systems, Not Just Models

For a production search, moderation, or assistant system, the question is not only which encoder has the highest F1. Retrieval, prompting, confidence thresholds, and fallback behavior all affect robustness.

A useful system should be able to say:

- I understand the Devanagari and Romanized forms consistently.
- The code-mixed query retrieves the same evidence as the clean query.
- This Romanized token has two plausible readings, so I need more context.
- My confidence drops on this style, and I should not make a high-stakes decision automatically.

That is a more honest definition of language support than a model card that lists `ne` among many supported languages.

## How Nepali NLP Should Move Forward

The next stage of Nepali NLP should not be framed only as building a larger Nepali model. It should be framed as representing a broader Nepali language ecosystem.

That means:

- Extending strong benchmarks such as NLUE with human-authored multi-script and code-mixed companion sets
- Funding native-speaker annotation of semantic families, ambiguity, and sociolinguistic variation
- Publishing training data, evaluation data, and preprocessing decisions with clear provenance and licensing
- Training directly across multiple styles without collapsing them into one canonical representation
- Measuring worst-style performance and cross-style consistency alongside average accuracy
- Including retrieval, generation, and dialogue tasks in addition to classification
- Building public error analyses so recurring failures become shared research targets

The field already has many of the pieces: monolingual corpora, multilingual transfer, transliteration models, code-switching research, broader NLU tasks, and researchers building tools for real Nepali text.

What is missing is a shared evaluation target that connects them.

The question should no longer be only, "Does this model understand Nepali written in Devanagari?"

It should be, "Does this system preserve understanding when a Nepali speaker writes naturally?"

That is the benchmark worth building.

## References

- [Guzmán et al. (2019), The FLORES Evaluation Datasets for Low-Resource Machine Translation: Nepali-English and Sinhala-English](https://aclanthology.org/D19-1632/)
- [Aguilar and Solorio (2020), From English to Code-Switching: Transfer Learning with Strong Morphological Clues](https://aclanthology.org/2020.acl-main.716/)
- [Ribeiro et al. (2020), Beyond Accuracy: Behavioral Testing of NLP Models with CheckList](https://aclanthology.org/2020.acl-main.442/)
- [Timilsina et al. (2022), NepBERTa: Nepali Language Model Trained in a Large Corpus](https://aclanthology.org/2022.aacl-short.34/)
- [Tiwari et al. (2022), Robust Hate Speech Detection via Mitigating Spurious Correlations](https://aclanthology.org/2022.aacl-short.7/)
- [Madhani et al. (2023), Aksharantar: Open Indic-Language Transliteration Datasets and Models](https://aclanthology.org/2023.findings-emnlp.4/)
- [Thapa et al. (2025), Development of Pre-Trained Transformer-Based Models for the Nepali Language](https://aclanthology.org/2025.chipsal-1.2/)
- [Nyachhyon et al. (2025), Consolidating and Developing Benchmarking Datasets for Nepali NLU](https://aclanthology.org/2025.findings-ijcnlp.119/)
- [Jayakumar et al. (2026), Scripts Through Time: A Survey of the Evolving Role of Transliteration in NLP](https://aclanthology.org/2026.findings-acl.1176/)
