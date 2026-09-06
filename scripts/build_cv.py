from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv.pdf"


def register_fonts():
    font_candidates = {
        "CVSans": "/System/Library/Fonts/Supplemental/Arial.ttf",
        "CVSans-Bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "CVSerif": "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "CVSerif-Bold": "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    }
    for name, path in font_candidates.items():
        if Path(path).exists():
            pdfmetrics.registerFont(TTFont(name, path))


register_fonts()
SANS = "CVSans" if "CVSans" in pdfmetrics.getRegisteredFontNames() else "Helvetica"
SANS_BOLD = "CVSans-Bold" if "CVSans-Bold" in pdfmetrics.getRegisteredFontNames() else "Helvetica-Bold"
SERIF = "CVSerif" if "CVSerif" in pdfmetrics.getRegisteredFontNames() else "Times-Roman"
SERIF_BOLD = "CVSerif-Bold" if "CVSerif-Bold" in pdfmetrics.getRegisteredFontNames() else "Times-Bold"

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4B5563")
ACCENT = colors.HexColor("#0E7490")
RULE = colors.HexColor("#CBD5E1")
PAPER = colors.white


class CVDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=letter,
            rightMargin=0.52 * inch,
            leftMargin=0.52 * inch,
            topMargin=0.42 * inch,
            bottomMargin=0.38 * inch,
            title="Kshitiz Tiwari - AI Research Engineer CV",
            author="Kshitiz Tiwari",
            subject="One-page curriculum vitae for AI research engineering roles",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="normal",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="cv", frames=[frame], onPage=draw_page))


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 0.28 * inch, letter[0] - doc.rightMargin, 0.28 * inch)
    canvas.setFont(SANS, 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.16 * inch, "kshitiztiwari.com")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.16 * inch, "Updated July 2026")
    canvas.restoreState()


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName=SERIF_BOLD,
    fontSize=26,
    leading=27,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=1,
)
role_style = ParagraphStyle(
    "Role",
    parent=styles["Normal"],
    fontName=SANS_BOLD,
    fontSize=10.2,
    leading=12.2,
    textColor=ACCENT,
    alignment=TA_LEFT,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName=SANS,
    fontSize=8.2,
    leading=10.8,
    textColor=MUTED,
    alignment=TA_RIGHT,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontName=SANS_BOLD,
    fontSize=9.3,
    leading=11.2,
    textColor=ACCENT,
    uppercase=True,
    spaceBefore=8,
    spaceAfter=4,
    borderWidth=0,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName=SANS,
    fontSize=8.65,
    leading=11.5,
    textColor=INK,
    spaceAfter=2.8,
)
small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=8.15,
    leading=10.7,
)
entry_title_style = ParagraphStyle(
    "EntryTitle",
    parent=body_style,
    fontName=SANS_BOLD,
    fontSize=9.2,
    leading=11.2,
    spaceAfter=0,
)
entry_meta_style = ParagraphStyle(
    "EntryMeta",
    parent=body_style,
    fontSize=8.0,
    leading=10.2,
    textColor=MUTED,
    alignment=TA_RIGHT,
    spaceAfter=0,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=10,
    firstLineIndent=-7,
    bulletIndent=0,
    bulletFontName=SANS,
    bulletFontSize=6.5,
    spaceAfter=2.4,
)


def section(title):
    heading = Paragraph(title.upper(), section_style)
    rule = Table([[""]], colWidths=[7.46 * inch], rowHeights=[1])
    rule.setStyle(TableStyle([("LINEABOVE", (0, 0), (-1, -1), 0.55, RULE)]))
    return [Spacer(1, 1), rule, heading]


def link(label, url):
    return f'<link href="{url}" color="#0E7490">{label}</link>'


def bullet(text):
    return Paragraph(text, bullet_style, bulletText="-")


def entry_header(title, subtitle, dates, location=""):
    left = Paragraph(f"<b>{title}</b><br/><font color='#4B5563'>{subtitle}</font>", entry_title_style)
    right_text = dates + (f"<br/><font color='#4B5563'>{location}</font>" if location else "")
    right = Paragraph(right_text, entry_meta_style)
    table = Table([[left, right]], colWidths=[5.75 * inch, 1.71 * inch], hAlign="LEFT")
    table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
    return table


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    story = []

    header_left = [
        Paragraph("KSHITIZ TIWARI", name_style),
        Paragraph("AI RESEARCH ENGINEER | LLM, NLP, RETRIEVAL &amp; EVALUATION", role_style),
    ]
    contact = Paragraph(
        "Fayetteville, AR<br/>"
        f"{link('pingkshitiz@gmail.com', 'mailto:pingkshitiz@gmail.com')} | "
        f"{link('LinkedIn', 'https://www.linkedin.com/in/zthsk/')} | "
        f"{link('GitHub', 'https://github.com/zthsk')}<br/>"
        f"{link('kshitiztiwari.com', 'https://kshitiztiwari.com')}",
        contact_style,
    )
    header = Table([[header_left, contact]], colWidths=[5.15 * inch, 2.31 * inch], hAlign="LEFT")
    header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.extend([header, Spacer(1, 4)])

    story.extend(section("Profile"))
    story.append(Paragraph(
        "PhD Candidate in Computer Science, expected December 2026, building reliable LLM and NLP systems across controllable generation, retrieval, agent orchestration, and evaluation. Published researcher with experience translating causal and robustness methods into reproducible Python, PyTorch, and FastAPI workflows.",
        body_style,
    ))

    story.extend(section("Experience"))
    experience_block = [
        entry_header("Graduate Research Assistant", "University of Arkansas - Reliable and Controllable Language Models", "Aug 2021 - Present", "Fayetteville, AR"),
        bullet("Design controllable-generation objectives combining representation intervention, contrastive learning, semantic preservation, and multi-metric evaluation."),
        bullet("Co-developed CEBERT; achieved 85.9% accuracy on word-replaced data and 86.0% on misspelled data versus the strongest reported baselines at 70.3% and 73.7%."),
        bullet("Developed a Minimum Description Length framework for adversarial detection without access to the original input; published in <i>Entropy</i> in 2024."),
        bullet("Build evaluation pipelines spanning SBERT similarity, BERTScore, classifier metrics, LLM-as-a-judge workflows, experiment tracking, and failure analysis."),
    ]
    story.append(KeepTogether(experience_block))

    story.extend(section("Selected Systems"))
    systems = [
        ("TraceLayer", "Private case study", "Designed an evidence-centered resume verification workflow with deterministic identity gates, promotion-only evidence flow, bounded retrieval, and fixture-backed evaluation."),
        ("Market Brief Agents", "Public repository", "Built a local-first research-to-video pipeline with LangGraph orchestration, typed manifests, RAG, audit bundles, validation gates, an operations dashboard, and deterministic fallbacks."),
        ("Hate Meme Detection", "Public repository", "Refactored BERT, ViT, multimodal fusion, and Gemini baselines into a shared experiment package with consistent data, training, evaluation, prompting, and smoke-test interfaces."),
    ]
    for title, visibility, description in systems:
        story.append(Paragraph(f"<b>{title}</b> <font color='#4B5563'>({visibility})</font> - {description}", small_style))

    story.extend(section("Publications"))
    publications = [
        f"<b>Tiwari, K.</b>, Zhang, L. (2024). {link('Implications of Minimum Description Length for Adversarial Attack in Natural Language Processing', 'https://www.mdpi.com/1099-4300/26/5/354')}. <i>Entropy</i>, 26(5), 354.",
        f"<b>Tiwari, K.</b>, Yuan, S., Zhang, L. (2022). {link('Robust Hate Speech Detection via Mitigating Spurious Correlations', 'https://aclanthology.org/2022.aacl-short.7/')}. AACL-IJCNLP, 51-56.",
        "<b>Tiwari, K.</b>, Zhang, L. Counterfactual Text Generation via Geometric Style Control in Large Language Models. <i>Manuscript in preparation.</i>",
    ]
    for publication in publications:
        story.append(bullet(publication))

    story.extend(section("Education"))
    education = Table(
        [[
            Paragraph("<b>Ph.D., Computer Science</b><br/><font color='#4B5563'>University of Arkansas | Expected Dec 2026</font>", small_style),
            Paragraph("<b>M.S., Computer Science</b><br/><font color='#4B5563'>University of Arkansas | Dec 2024</font>", small_style),
            Paragraph("<b>B.Sc., CS &amp; IT</b><br/><font color='#4B5563'>Tribhuvan University | 2018</font>", small_style),
        ]],
        colWidths=[2.58 * inch, 2.48 * inch, 2.4 * inch],
    )
    education.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(education)

    story.extend(section("Technical Skills"))
    skills = [
        ("Programming", "Python, C++, SQL"),
        ("LLM & NLP", "PyTorch, Hugging Face Transformers, PEFT, TRL, Sentence-Transformers, BERT, SBERT"),
        ("AI Systems", "FastAPI, LangGraph, RAG, dense retrieval, Qdrant, Pydantic, Streamlit"),
        ("Evaluation", "BERTScore, embedding similarity, ranking metrics, LLM-as-a-judge, Weights & Biases"),
        ("ML & Data", "scikit-learn, XGBoost, Pandas, NumPy, spaCy, NLTK"),
    ]
    skills_table = Table(
        [[Paragraph(f"<b>{name}</b>", small_style), Paragraph(value, small_style)] for name, value in skills],
        colWidths=[1.05 * inch, 6.41 * inch],
    )
    skills_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    story.append(skills_table)

    doc = CVDocTemplate(str(OUTPUT))
    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_cv()
