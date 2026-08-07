// ... (keep all previous imports)
import chatRoutes from './routes/chatRoutes'; // <--- ADD THIS LINE

// ... (inside API Routes)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tournaments', tournamentRoutes);
app.use('/api/v1/posters', posterRoutes);
app.use('/api/v1/announcements', announcementRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/chat', chatRoutes); // <--- ADD THIS LINE