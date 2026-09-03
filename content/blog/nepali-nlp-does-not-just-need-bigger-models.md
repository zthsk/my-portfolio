---
title: "Nepali NLP Does Not Just Need Bigger Models"
date: "2026-09-02"
excerpt: "Recent Nepali NLP research suggests that model scale is only part of the story. Language proximity, data quality, dialect coverage, script variation, and representative benchmarks matter just as much."
image: "/images/blog/nepali-nlp-does-not-just-need-bigger-models.png"
imageAlt: "A language model connected equally to Nepali speech, curated data, regional dialects, Devanagari, Romanized text, and a benchmark matrix."
tags:
  - Nepali NLP
  - Low-Resource NLP
  - Multilingual AI
  - NLP Evaluation
---

When discussing low-resource NLP, we often default to a straightforward diagnosis:

There is not enough data.

The implied solution then becomes equally straightforward:

Use a larger multilingual model trained on more data.

For Nepali, recent research suggests that this explanation is incomplete.

Several 2026 studies point toward a more interesting picture. Model scale matters, but so do language proximity, data quality, dialect coverage, script variation, and the type of Nepali represented in our benchmarks.

That leads to a question I think Nepali NLP needs to ask much more seriously:

«When we say a model “works for Nepali,” which Nepali are we actually talking about?»

## Bigger Does Not Necessarily Mean Better

A useful example comes from automatic speech recognition.

Paudel and Sayami recently conducted a controlled comparison of six multilingual pretrained speech models for Nepali ASR, including XLSR-53, IndicWav2Vec, MMS-1B, Whisper-Medium, Whisper-Large-v3-Turbo, and Conformer-Hi.[^1]

The models were fine-tuned on approximately 165 hours of Nepali speech from OpenSLR SLR54 and evaluated across multiple test sets.[^1]

The most interesting result is not simply which model won.

Whisper-Large-v3-Turbo achieved 14.76% WER, while IndicWav2Vec achieved 14.89% WER—effectively comparable in-domain performance despite an approximately nine-fold parameter difference and a much larger difference in pretraining data.[^1]

That suggests something important.

For low-resource languages, linguistic proximity in pretraining can sometimes compete with raw scale.

The same study also found an important deployment trade-off. CTC-based models could decode substantially faster than autoregressive Whisper models, while massively multilingual pretraining provided stronger robustness under out-of-domain evaluation.[^1]

So even asking which model is “best” becomes underspecified.

Best for what?

Peak in-domain accuracy?

Domain transfer?

Inference speed?

Resource-constrained deployment?

Nepali NLP needs these distinctions.

## Better Data May Matter More Than More Data

Another 2026 study makes the data-quality argument even more directly.

Pandit et al. worked on Nepali speech recognition using noisy real-world speech data where automatically generated subtitles can provide unreliable supervision.[^2]

Instead of training Whisper indiscriminately on every available example, they collected human quality ratings for 2,000 transcription samples and trained a lightweight Random Forest classifier to predict which samples were sufficiently reliable.[^2]

The classifier achieved 81% held-out accuracy. After two filtering and retraining cycles on a 40,000-clip training subset from a 68.4-hour corpus, their Whisper system improved from 5.60% to 4.89% WER and from 5.10% to 4.52% CER.[^2]

The lesson is almost embarrassingly simple:

«Low-resource does not mean every available example is equally valuable.»

When training data is scarce, filtering bad supervision can sometimes be more productive than blindly increasing dataset size.

For low-resource NLP, data curation is not merely preprocessing.

It is part of the modeling strategy.

## Standard Nepali Is Not the Entire Language

The problem becomes even more obvious when we move from data quantity to linguistic coverage.

Most Nepali NLP resources and benchmarks naturally gravitate toward Standard Nepali.

That gives us cleaner datasets and easier annotation.

But real language use is considerably messier.

Nepali varies geographically, socially, and digitally.

One particularly useful study examines this problem through the Achhami dialect.

Dhamala et al. created a parallel dataset of 300 Standard Nepali–Achhami sentence pairs spanning news, cultural topics, and everyday conversation.[^3] They then evaluated both fine-tuned Transformer models and prompted LLMs on NER and POS tagging.

Every evaluated model degraded when moving from Standard Nepali to Achhami.[^3]

For NER, F1 declined by approximately 2.12 to 3.97 points. Interestingly, the monolingual NepBERTa model was more robust than the evaluated multilingual mBERT system, while Claude 3.5 Haiku achieved the strongest NER performance among the tested systems.[^3]

The POS results exposed even larger weaknesses.

This matters because a model can perform extremely well on a Standard Nepali benchmark while still struggling with language varieties spoken by Nepali users.

A leaderboard score can therefore hide a coverage problem.

## Script Is Another Dimension of the Same Problem

Dialect is not the only source of variation.

Anyone who has spent time around Nepali social media knows that actual digital Nepali frequently looks nothing like formal newspaper text.

Users write in Devanagari.

They write in Romanized Nepali.

They code-mix with English.

They abbreviate.

They approximate pronunciation.

And different users Romanize the same expression in completely different ways.

For example, even a phrase such as:

`के छ नि खबर? ठीक छ?`

might appear online in forms such as:

`k xa ni khabar? thik xa?`

or considerably more compressed variants.

Patel et al.’s NepaliXlit work directly addresses this script mismatch.[^4]

They fine-tuned a transliteration model using 2,943 informal word pairs and evaluated it on 736 held-out pairs. Their model improved transliteration accuracy by 8% and reduced character error rate by 11% compared with their baseline.[^4]

They then used sentiment classification to test whether transliteration helped downstream NLP. Transliteration into Devanagari improved the performance of multilingual encoder models such as mBERT and MuRIL.[^4]

But there is another result I find even more interesting.

The evaluated generative LLMs showed substantially stronger cross-script generalization than those encoder baselines.[^4]

That complicates the traditional pipeline:

Romanized Nepali → normalization/transliteration → Standard Nepali → NLP model

For some architectures, transliteration remains extremely useful.

But for stronger multilingual LLMs, the better long-term question may not be how perfectly we can force informal Nepali into Standard Devanagari.

It may be:

«Can we build representations that understand these varieties directly?»

## Normalization Is Useful, but It Should Not Become the End Goal

This distinction matters.

Normalization is an important tool.

If transliteration improves a downstream classifier by a large margin, we should use it.

But normalization also transforms the original input.

Consider:

`ma pani khanchu ni`

Depending on context, `pani` can participate in quite different semantic constructions. Informal writing, code-mixing, dialect features, morphology, and surrounding discourse provide information that cannot always be recovered by independently mapping surface forms to a standardized dictionary representation.

A pipeline obsessed with converting every input into a canonical form risks treating linguistic variation primarily as noise.

But some variation carries meaning.

For modern NLP systems, particularly contextual and generative models, the research problem should therefore move beyond:

«How do we normalize this string?»

toward:

«How do we represent this string so the model understands what it means in context?»

Normalization can be part of that solution.

It should not automatically define the solution.

## We Also Have a Benchmarking Problem

This brings us to what I think is one of the largest gaps in Nepali NLP.

Suppose a model reports 92% accuracy on a Nepali benchmark.

What exactly have we learned?

Does it work on:

- formal news?
- conversational Nepali?
- Achhami?
- Romanized Nepali?
- mixed Roman–Devanagari text?
- English–Nepali code-mixing?
- spelling variation?
- older Nepali?
- social-media shorthand?
- culturally dependent reasoning?

Unless our benchmark covers those conditions, the answer is:

We do not know.

This is why I think the next stage of Nepali NLP should emphasize coverage evaluation, not only larger training corpora.

Instead of one aggregate Nepali score, imagine evaluation across several axes:

- **Script:** Devanagari ↔ Romanized ↔ mixed
- **Register:** formal ↔ conversational ↔ social
- **Geography:** Standard Nepali ↔ regional varieties
- **Time:** historical ↔ contemporary
- **Domain:** news ↔ social media ↔ government ↔ literature ↔ dialogue
- **Language interaction:** monolingual ↔ code-mixed

That would tell us far more about a model’s real linguistic capability than another benchmark containing only standardized text.

## What Nepali NLP Needs Next

The emerging evidence points toward a research agenda that is broader than “collect more data and fine-tune a larger model.”

Nepali NLP needs:

- better data, not merely more data;
- dialect-aware evaluation, rather than assuming Standard Nepali represents everyone;
- multi-script robustness, particularly for Romanized and mixed Nepali;
- domain-aware benchmarks, extending beyond formal news;
- efficient models, because deployment constraints matter;
- and, importantly, evaluation frameworks that expose where models fail.

Large multilingual models will clearly be part of this future.

But model scale alone cannot tell us whether the resulting system understands the diversity of Nepali language use.

So instead of asking only:

«How good is this model at Nepali?»

I think we should increasingly ask:

«Which Nepali does this model understand—and which Nepali does it leave behind?»

That is a harder question.

But for a genuinely useful Nepali NLP ecosystem, it is the one worth answering.

## References

[^1]: Paudel, S., & Sayami, S. (2026). [Comparative Analysis of Multilingual Pre-trained Models for Nepali Automatic Speech Recognition](https://arxiv.org/abs/2608.12327). *arXiv preprint arXiv:2608.12327*.
[^2]: Pandit, A., Khanal, Y., Pandey, I., Kunwar, K., & Regmi, S. (2026). [Reward-Guided Fine-Tuning of Whisper for Low-Resource Nepali Speech Recognition](https://aclanthology.org/2026.chipsal-1.16/). In *Proceedings of the Second Workshop on Challenges in Processing South Asian Languages (CHiPSAL 2026)*, 169–175. [https://doi.org/10.63317/45u9hjmchyhh](https://doi.org/10.63317/45u9hjmchyhh)
[^3]: Dhamala, S., Beejukchhen, R., Thakulla, S., Kadayat, B., & Khadka, S. (2026). [Evaluating Nepali NER and POS Tagging Models on the Achhami Dialect](https://aclanthology.org/2026.sigul-1.21/). In *Proceedings of the SIGUL 2026 Joint Workshop with ELE, EURALI, and DCLRL*, 210–221. [https://doi.org/10.63317/5hmcq734e4yd](https://doi.org/10.63317/5hmcq734e4yd)
[^4]: Patel, S., Dhami, K. K., Sherpa, N., & Khadka, S. (2026). [From Romanized to Devanagari: Enhancing Nepali Sentiment Analysis with NepaliXlit](https://aclanthology.org/2026.chipsal-1.12/). In *Proceedings of the Second Workshop on Challenges in Processing South Asian Languages (CHiPSAL 2026)*, 115–126. [https://doi.org/10.63317/5j8kkeb2myf6](https://doi.org/10.63317/5j8kkeb2myf6)
