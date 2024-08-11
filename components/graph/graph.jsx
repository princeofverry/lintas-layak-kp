import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Graph = ({ sortOption }) => {
    const [reportCounts, setReportCounts] = useState([]);
    const [error, setError] = useState(null);

    const fetchReportCounts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/report/count-by-kecamatan');
            setReportCounts(response.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching report counts:', error);
        }
    };

    useEffect(() => {
        fetchReportCounts();
    }, []);

    // Urutan yang diinginkan
    const orderedKecamatan = [
        'Banyumanik', 'Candisari', 'Gajah Mungkur', 'Gayamsari', 'Genuk',
        'Gunung Pati', 'Mijen', 'Ngaliyan', 'Pedurungan', 'Semarang Barat',
        'Semarang Selatan', 'Semarang Tengah', 'Semarang Timur', 'Semarang Utara',
        'Tembalang', 'Tugu'
    ];

    // Mengurutkan reportCounts sesuai urutan yang diinginkan
    const sortedReportCounts = orderedKecamatan.map(kecamatan => {
        const report = reportCounts.find(item => item.kecamatan === kecamatan);
        return {
            kecamatan,
            count: report ? report.count : 0
        };
    });

    // Fungsi untuk mengurutkan data berdasarkan sortOption
    const sortData = (data) => {
        switch (sortOption) {
            case 'Tertinggi':
                return [...data].sort((a, b) => b.count - a.count);
            case 'Terendah':
                return [...data].sort((a, b) => a.count - b.count);
            default:
                return data;
        }
    };

    const data = {
        labels: sortData(sortedReportCounts).map(item => item.kecamatan),
        datasets: [
            {
                label: 'Kecamatan',
                data: sortData(sortedReportCounts).map(item => item.count),
                borderColor: 'rgba(33, 133, 213, 0.8)',
                backgroundColor: 'rgba(33, 133, 213, 0.8)',
            },
        ],
    };

    return (
        <div>
            {error ? (
                <p>Error fetching data</p>
            ) : (
                <Bar data={data} />
            )}
        </div>
    );
};

export default Graph;
