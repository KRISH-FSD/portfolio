from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = "public/KRISHNAKANTH_RESUME.pdf"


def p(text, style):
    return Paragraph(text, style)


def section(title, styles):
    return [
        Spacer(1, 7),
        Paragraph(title, styles["Section"]),
        Spacer(1, 3),
    ]


def bullet(text, styles):
    return Paragraph(f"• {text}", styles["Bullet"])


def main():
    base = getSampleStyleSheet()
    styles = {
        "Name": ParagraphStyle(
            "Name",
            parent=base["Title"],
            alignment=TA_CENTER,
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=colors.HexColor("#111111"),
            spaceAfter=2,
        ),
        "Sub": ParagraphStyle(
            "Sub",
            parent=base["Normal"],
            alignment=TA_CENTER,
            fontName="Helvetica",
            fontSize=9.5,
            leading=12,
            textColor=colors.HexColor("#333333"),
        ),
        "Section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=colors.HexColor("#111111"),
            borderWidth=0,
            borderPadding=0,
            spaceAfter=1,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=11.3,
            textColor=colors.HexColor("#222222"),
            alignment=TA_LEFT,
        ),
        "Small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.3,
            leading=10.6,
            textColor=colors.HexColor("#222222"),
        ),
        "Role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.9,
            leading=11.2,
            textColor=colors.HexColor("#111111"),
        ),
        "Meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8.2,
            leading=10.4,
            textColor=colors.HexColor("#444444"),
        ),
        "Bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.35,
            leading=10.4,
            leftIndent=9,
            firstLineIndent=-6,
            textColor=colors.HexColor("#222222"),
        ),
    }

    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title="Krishnakanth S Resume",
        author="Krishnakanth S",
    )

    story = [
        p("KRISHNAKANTH S", styles["Name"]),
        p("BCA Student | Tech Enthusiast", styles["Sub"]),
        p("Krishsivakumar31@gmail.com | +91 90036 57036 | Kumbakonam", styles["Sub"]),
        p("LinkedIn | GitHub", styles["Sub"]),
    ]

    story += section("CAREER OBJECTIVE", styles)
    story.append(
        p(
            "Aspiring AI and data-focused BCA student with fundamentals in Python, Flask backend development, and MySQL. "
            "Experienced in building data-driven applications and analytics dashboards, seeking to apply analytical and "
            "problem-solving skills in AI or data-oriented roles.",
            styles["Body"],
        )
    )

    story += section("SKILLS", styles)
    skills = [
        ["Technical Skills", "Languages: Java | Python"],
        ["Frontend", "HTML | CSS | JavaScript | React"],
        ["Backend / Database", "Python/Flask | MySQL"],
        ["Tools", "Git | GitHub | REST APIs | JSON Handling | VS Code"],
        ["Soft Skills", "Teamwork | Analytical Thinking | Problem Solving | Communication"],
    ]
    table = Table(
        [[p(f"<b>{left}</b>", styles["Small"]), p(right, styles["Small"])] for left, right in skills],
        colWidths=[38 * mm, 124 * mm],
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(table)

    story += section("EDUCATION", styles)
    story.append(p("<b>Bachelor of Computer Applications (BCA)</b>", styles["Body"]))
    story.append(p("SASTRA University, Kumbakonam | 2023 - Present | CGPA: 7.6 / 10", styles["Small"]))
    story.append(Spacer(1, 2))
    story.append(p("<b>HSC Class XII, Computer Science</b>", styles["Body"]))
    story.append(p("Town Higher Secondary School, Kumbakonam | 2022 - 2023 | Percentage: 74%", styles["Small"]))

    story += section("PROJECTS", styles)
    story.append(p("1) AGRO AI - Crop Monitoring & Yield Analytics", styles["Role"]))
    story.append(p("Links: GitHub", styles["Meta"]))
    story.append(p("Tech Stack: HTML, CSS, JavaScript, Python, Flask, Chart.js, MySQL.", styles["Small"]))
    story.append(bullet("Developed a full-stack web application to analyse crop data and provide yield insights using data visualization.", styles))
    story.append(bullet("Designed and implemented relational database schema with CRUD operations for analytics tracking.", styles))
    story.append(bullet("Integrated interactive bar and pie charts using Chart.js for data visualization and insights.", styles))
    story.append(Spacer(1, 2))
    story.append(p("2) Zyra Fashion - Responsive E-commerce Website", styles["Role"]))
    story.append(p("Links: Live Demo | GitHub", styles["Meta"]))
    story.append(p("Tech Stack: HTML, CSS, JavaScript. (Responsive).", styles["Small"]))
    story.append(p("Description: Developed a responsive e-commerce frontend with a modern UI and working hamburger menu.", styles["Small"]))
    story.append(Spacer(1, 2))
    story.append(p("3) React QR Code Generator", styles["Role"]))
    story.append(p("Links: GitHub", styles["Meta"]))
    story.append(p("Tech Stack: HTML, CSS, JavaScript (ES6+), React, Vite.", styles["Small"]))
    story.append(p("Description: Users can enter text or URLs to generate QR codes dynamically with real-time QR code rendering.", styles["Small"]))

    story += section("INTERNSHIP", styles)
    story.append(p("<b>Web Development Intern - Learn Flu EdTech</b>", styles["Body"]))
    story.append(p("June 2024 - Aug 2024", styles["Small"]))
    story.append(bullet("Contributed to a live web development project involving frontend implementation and basic backend integration.", styles))

    story += section("ACHIEVEMENTS", styles)
    story.append(
        bullet(
            "First Prize - AGRO IQ AI: Crop Monitoring & Disease Detection Project (Technical Competition).",
            styles,
        )
    )

    story += section("CERTIFICATES", styles)
    certs = [
        "Python Programming Workshop - IIT Madras (Mechanica 2024)",
        "Web Development Live Project - Learn Flu",
        "Artificial Intelligence Tools Workshop - BE 10X",
        "Git & GitHub Bootcamp - Let's Upgrade",
        "Event Planning Head - S FOSS Association (SASTRA University)",
    ]
    for item in certs:
        story.append(bullet(item, styles))

    doc.build(story)


if __name__ == "__main__":
    main()
