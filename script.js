document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Main View Landing Chart Mock Config ---
    const ctx = document.getElementById('envChart');
    let envChart;
    if (ctx) {
        envChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Carbon Emissions', 'Energy Usage', 'Waste Reduction'],
                datasets: [{
                    label: 'Metrics (in tons)',
                    data: [120, 80, 50],
                    backgroundColor: ['#003366', '#00a0e3', '#007acc'],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const updateBtn = document.getElementById('updateChart');
    if (updateBtn && envChart) {
        updateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            envChart.data.datasets[0].data = [100, 90, 60]; 
            envChart.update();
            alert('Chart updated with new sustainability data!');
        });
    }

    // --- 2. Interactive Sub-Dashboard Actions ---
    const govBtn = document.getElementById('updateData');
    if (govBtn) {
        govBtn.addEventListener('click', () => {
            alert('Data updated! New Board Diversity: 75%, Ethical Compliance: 97%.');
        });
    }

    const socialBtn = document.getElementById('learnMore');
    if (socialBtn) {
        socialBtn.addEventListener('click', () => {
            alert('For more details on social responsibility metrics, contact our team!');
        });
    }

    // --- 3. Single Page Application Router Engine ---
    const mainView = document.getElementById('main-view');
    const dashboardContainer = document.getElementById('dashboard-view-container');
    const backBtn = document.getElementById('back-to-home-btn');
    const dashboardTriggers = document.querySelectorAll('.metric-dashboard-trigger');
    const subDashboards = document.querySelectorAll('.sub-dashboard');
    const homeNavTriggers = document.querySelectorAll('.home-nav-trigger');

    // Default configuration data fields mapping to standard InfoSys demo page load
    const demoDefaultData = {
        company: "Infosys Ltd",
        location: "India (Global)",
        overall: 85,
        env: 88,
        soc: 79,
        gov: 89,
        trend: "▲ +12 pts",
        trendColor: "#27ae60",
        sentiment: "POSITIVE - 92%",
        symbol: "👍",
        graph: "pts.png", 
        insights: [
            "Strong community engagement driving positive social sentiment.",
            "Recent green initiatives boost environmental score.",
            "Stable governance structure confirmed."
        ],
        summary: "Outperforming industry average by 15%"
    };

    function applyReportCardData(data, isGenerated) {
        document.getElementById('report-main-title').innerText = isGenerated ? "DYNAMIC PREDICTIVE INSIGHTS REPORT" : "INVESTOR ESG PREDICTOR INSIGHTS";
        document.getElementById('report-sub-title').innerText = isGenerated ? `Real-time Scorecard Generated for ${data.company}` : "Predictive Analytics & Sentiment Analysis for Smarter Decisions";
        document.getElementById('card-display-mode-label').innerText = isGenerated ? "GENERATED ESG REPORT CARD:" : "DEMO ESG REPORT CARD:";
        
        document.getElementById('target-company-display').innerText = data.company;
        document.getElementById('target-location-row').innerText = `Region: ${data.location}`;
        document.getElementById('overall-score').innerText = data.overall;
        
        const pointsVal = document.getElementById('trend-points-value');
        pointsVal.innerText = data.trend;
        pointsVal.style.color = data.trendColor;

        // Injects graph visualization image asset paths dynamically into your template layout block position
        document.getElementById('dynamic-trend-graph-target').innerHTML = `<img src="${data.graph}" alt="Performance Trend Graph" style="width:140px; height:auto; border-radius:4px;">`;

        const rEnv = document.getElementById('ring-env');
        const rSoc = document.getElementById('ring-soc');
        const rGov = document.getElementById('ring-gov');
        
        rEnv.setAttribute('data-percent', data.env);
        rEnv.style.setProperty('--percent', data.env);
        
        rSoc.setAttribute('data-percent', data.soc);
        rSoc.style.setProperty('--percent', data.soc);
        
        rGov.setAttribute('data-percent', data.gov);
        rGov.style.setProperty('--percent', data.gov);

        document.getElementById('thumbs-indicator-symbol').innerText = data.symbol;
        document.getElementById('sentiment-percentage-status').innerText = data.sentiment;

        const insightsTarget = document.getElementById('dynamic-insights-list');
        insightsTarget.innerHTML = "";
        data.insights.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            insightsTarget.appendChild(li);
        });

        document.getElementById('dynamic-comparison-summary').innerText = data.summary;
    }

    dashboardTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');

            if (targetId === 'report-card-dashboard') {
                applyReportCardData(demoDefaultData, false);
            }

            mainView.style.display = 'none';
            dashboardContainer.style.display = 'block';

            subDashboards.forEach(db => db.style.display = 'none');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                window.scrollTo(0, 0);
            }
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            dashboardContainer.style.display = 'none';
            mainView.style.display = 'block';
            window.scrollTo(0, 0);
        });
    }

    homeNavTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            dashboardContainer.style.display = 'none';
            mainView.style.display = 'block';
        });
    });

    // --- 4. Predictive Generator Hook (PDF Download Framework) ---
    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const companyInput = document.getElementById('company').value.trim();
            const stateSelect = document.getElementById('state');
            const stateText = stateSelect.options[stateSelect.selectedIndex].text;

            if (!companyInput || !stateSelect.value) {
                alert('Please provide all mandatory input variables.');
                return;
            }

            /* ========================================================================
               PREPARED BACKEND RESPONSE BINDING OBJECT
               ========================================================================
               When your backend server API code finishes running, replace this mock object 
               with your live server data array (e.g., fetch request data results):
            */
            const backendResponse = {
                companyName: companyInput,
                overallScore: Math.floor(Math.random() * (96 - 65 + 1)) + 65, 
                environmentalScore: Math.floor(Math.random() * 30) + 65,      
                socialScore: Math.floor(Math.random() * 30) + 65,             
                governanceScore: Math.floor(Math.random() * 30) + 65,           
                sentimentAnalysisPercentage: Math.floor(Math.random() * 40) + 58 
            };

            // Mapping variable attributes directly out from backend parameters data fields
            let formattedData = {
                company: backendResponse.companyName,
                location: stateText,
                env: backendResponse.environmentalScore,
                soc: backendResponse.socialScore,
                gov: backendResponse.governanceScore,
                overall: backendResponse.overallScore
            };

            // Calculate Curve Metrics & points layout to reference your 3 uploaded local assets explicitly
            if (backendResponse.overallScore >= 82) {
                // Profit Scenario: Positive Sentiment -> Injects your uploaded upward_graph.png asset file
                formattedData.trend = "▲ Upward Growth Trend";
                formattedData.trendColor = "#27ae60";
                formattedData.sentiment = `POSITIVE - ${backendResponse.sentimentAnalysisPercentage}%`;
                formattedData.symbol = "👍";
                formattedData.graph = "pts.png"; 
                formattedData.insights = [
                    "Excellent corporate resource optimization strategies.",
                    "Renewable clean energy choices boost environmental metrics.",
                    "Positive public sentiment across corporate parameters."
                ];
                formattedData.summary = "Outperforming local industry averages significantly.";
            } else if (backendResponse.overallScore <= 72) {
                // Loss Scenario: Negative Sentiment -> Injects your uploaded downward_graph.png asset file
                formattedData.trend = "▼ Downward Risk Warning";
                formattedData.trendColor = "#c0392b";
                formattedData.sentiment = `NEGATIVE - ${backendResponse.sentimentAnalysisPercentage}%`;
                formattedData.symbol = "👎";
                formattedData.graph = "down_scale.png"; 
                formattedData.insights = [
                    "High infrastructure emission footprint reported.",
                    "Pending compliance updates observed in internal models.",
                    "Negative online sentiment signals require adjustment."
                ];
                formattedData.summary = "Underperforming standard regional benchmark averages.";
            } else {
                // Flat Scenario: Neutral Sentiment -> Injects your uploaded flat_graph.png asset file
                formattedData.trend = "■ Stable Market Flatline";
                formattedData.trendColor = "#7f8c8d";
                formattedData.sentiment = `NEUTRAL - ${backendResponse.sentimentAnalysisPercentage}%`;
                formattedData.symbol = "📊";
                formattedData.graph = "nutral.png"; 
                formattedData.insights = [
                    "Standard environmental impact profiles.",
                    "Consistent workplace safety and diversity metrics.",
                    "Stable corporate governance tracking."
                ];
                formattedData.summary = "Consistently meeting current industry standard benchmarks.";
            }

            // Bind values directly into active dashboard node positions
            applyReportCardData(formattedData, true);

            // Shift SPA router view visibility layer attributes instantly
            mainView.style.display = 'none';
            dashboardContainer.style.display = 'block';
            subDashboards.forEach(db => db.style.display = 'none');
            document.getElementById('report-card-dashboard').style.display = 'block';
            window.scrollTo(0, 0);

            // Execute html2pdf layout processing loop metrics parameters
            const exportTarget = document.getElementById('report-card-dashboard');
            const fileOptions = {
                margin:       [0.4, 0.4],
                filename:     `${backendResponse.companyName.replace(/\s+/g, '_')}_ESG_Report.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Compiles high-fidelity snapshot panel and saves locally to machine download folder
            html2pdf().set(fileOptions).from(exportTarget).save().then(() => {
                demoForm.reset();
            });
        });
    }
});